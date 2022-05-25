import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'StoryBrowserWebPartStrings';
import StoryBrowser from './components/StoryBrowser';
import { IStoryBrowserProps } from './components/IStoryBrowserProps';
import * as story from '../Story';
import * as wwfilters from '../Filters';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import { filteredAssign, transitionKeysAreEqual } from 'office-ui-fabric-react';
import { filter, reject } from 'lodash';

export interface IStoryBrowserWebPartProps {
  description: string;
  ListGUID: string;
}

import { sp } from "@pnp/sp/presets/all";  
import { useControlledState } from 'office-ui-fabric-react/lib/Foundation';

export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {

  private _stories: story.Story[];
  private _tagsFilters: string[];
  private _industryFilters: string[];
  private _partnerTypeFilters: string[];
  private _solutionAreaFilters: string[];
  private _storyTypeFilters: string[];

  protected onInit(): Promise<void> {

    return super.onInit();
  }

  public render(): void {
    //Get User Permissions
    this._getInteralUser().then(internalPermission =>{
      this.isInternal = internalPermission as boolean;
      console.log('hi');
      
      //Get Filter Choices
      this._getfieldChoices().then((fieldResponse) => {
        console.log(this._industryFilters);

        //Get Initial List
        this._getSearchData().then(response => {
          console.log('hi2');
          this._stories = response as story.Story[];
          
          const element: React.ReactElement<IStoryBrowserProps> = React.createElement(StoryBrowser, {
            stories: this._stories,
            tagsFilters: this._tagsFilters,
            industryFilters: this._industryFilters,
            partnerTypeFilters: this._partnerTypeFilters,
            solutionAreaFilters: this._solutionAreaFilters,
            storyTypeFilters: this._storyTypeFilters
          });
          ReactDom.render(element, this.domElement);
      });
    });

      return true;
    })
    .catch(err => console.log('There was an error:' + err));
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneButton('ClickHere',  
                {  
                 text: "ClickHere",  
                 buttonType: PropertyPaneButtonType.Normal,  
                 onClick: this.onPropertyPaneFieldChanged.bind(this)  
                }), 
                PropertyPaneTextField('ListGUID', {
                  label: 'List ID (GUID)',
                  value: strings.ListGUID,
                  
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'ListGUID' && newValue) {
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
      // re-render the web part as clearing the loading indicator removes the web part body
      this.render();      
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, oldValue);
    }
  }


  
  private isInternal :boolean = false;

  private _getfieldChoices(){
    sp.setup({
      spfxContext: this.context
    });    

    return new Promise((resolve) => {
      let list = sp.web.lists.getById(this.properties.ListGUID);
      
      let tags = list.fields.getByInternalNameOrTitle('Tags');
      tags.select('Choices').get().then((tgoptions) => {  
        this._tagsFilters = tgoptions['Choices'];
        
      
        let industry = list.fields.getByInternalNameOrTitle('Industry');
        industry.select('Choices').get().then((idoptions) => {  
          this._industryFilters = idoptions['Choices'];            
      
          let partnerType = list.fields.getByInternalNameOrTitle('PartnerType');
          partnerType.select('Choices').get().then((ptoptions) => {  
            this._partnerTypeFilters = ptoptions['Choices'];

            let solutionArea = list.fields.getByInternalNameOrTitle('SolutionArea');
            solutionArea.select('Choices').get().then((saoptions) => {  
              this._solutionAreaFilters = saoptions['Choices'];
              
              let storyType = list.fields.getByInternalNameOrTitle('StoryType');
              storyType.select('Choices').get().then((stoptions) => {  
                this._storyTypeFilters = stoptions['Choices'];

                resolve(true);
              });
            });
          });
        });
      });     
    });
  }

  
  private _getSearchData(Industry: string = "")
  {
    sp.setup({
      spfxContext: this.context
    });    

    return new Promise((resolve) => {
        sp.web.lists.getById(this.properties.ListGUID).renderListDataAsStream(
        {
          ViewXml: `
              <View>
                <RowLimit Paged="TRUE">5000</RowLimit>
              </View>`,
        }).then(items => {
          
          let filteredResults = items.Row;
          if(!this.isInternal){  
            //USER DOES NOT HAVE PERMISSION TO VIEW INTERNAL STORIES        
            filteredResults = filteredResults.filter(item => item['StoryType'] == 'External Case Study');
          }
          resolve(JSON.parse(JSON.stringify(filteredResults)));
  
        });

    });
  }

  private _getInteralUser()
{
  return new Promise((resolve) => {
   this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/currentuser/groups",
         SPHttpClient.configurations.v1)
     .then((groupResponse: SPHttpClientResponse) => {
         groupResponse.json().then((groupsData: any) => {
             var groups = groupsData.value;
             var internal = false;

             groups.forEach(group => {
                 if (group.Title == "Internal Users") {                   
                     internal = true;
                 }
             });

             resolve(internal);

            
         });
     });
    });
 }


}

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
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

export interface IStoryBrowserWebPartProps {
  description: string;
  ListGUID: string;
}

import { sp } from "@pnp/sp/presets/all";  
import { useControlledState } from 'office-ui-fabric-react/lib/Foundation';

export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {

  private _stories: story.Story[];
  private _filters: wwfilters.Filter[] = [];
  private _lists: IPropertyPaneDropdownOption[];

  protected onInit(): Promise<void> {

    return super.onInit();
  }

  public render(): void {
      //Get all Lists for configuration
      this.getLists().then(listResolve =>{
      this._lists = listResolve as IPropertyPaneDropdownOption[];
      
      //Get User Permissions
      this._getInteralUser().then(internalPermission =>{
        this.isInternal = internalPermission as boolean;
        
        //Get Filter Choices
        this._getfieldChoices().then((fieldResponse) => {

          //Get Initial List
          this._getSearchData().then(response => {
            this._stories = response as story.Story[];
            
            const element: React.ReactElement<IStoryBrowserProps> = React.createElement(StoryBrowser, {
              stories: this._stories,
              filters: this._filters
            });
            ReactDom.render(element, this.domElement);
            })
          })
          return true;
        });
      });     
      
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
                PropertyPaneDropdown('ListGUID', {
                  label:'List ID (GUID)',
                  options: this._lists,
                  selectedKey: this.properties.ListGUID
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private getLists(){
    sp.setup({
      spfxContext: this.context
    });    
    return new Promise((resolve) => {
      sp.web.lists.get().then(result =>{   
        let options :IPropertyPaneDropdownOption[] = [];
        result.forEach(item =>{
          let option :IPropertyPaneDropdownOption = {
            key: item.Id,
            text: item.Title
          }

          options.push(option);
        })
        resolve(options);
      });
    });
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
        
        tgoptions['Choices'].forEach(item => {
          this._filters.push({
            Field: 'Tags',
            Value: item,
            IsChecked: true
          });
        });
        
      
        let industry = list.fields.getByInternalNameOrTitle('Industry');
        industry.select('Choices').get().then((idoptions) => {  
          idoptions['Choices'].forEach(item => {
            this._filters.push({
              Field: 'Industry',
              Value: item,
              IsChecked: true
            });
          });    
      
          let partnerType = list.fields.getByInternalNameOrTitle('PartnerType');
          partnerType.select('Choices').get().then((ptoptions) => {  
            ptoptions['Choices'].forEach(item => {
              this._filters.push({
                Field: 'PartnerType',
                Value: item,
                IsChecked: true
              });
            });

            let solutionArea = list.fields.getByInternalNameOrTitle('SolutionArea');
            solutionArea.select('Choices').get().then((saoptions) => {  
              saoptions['Choices'].forEach(item => {
                this._filters.push({
                  Field: 'SolutionArea',
                  Value: item,
                  IsChecked: true
                });
              });
              
              let storyType = list.fields.getByInternalNameOrTitle('StoryType');
              storyType.select('Choices').get().then((stoptions) => {  
                stoptions['Choices'].forEach(item => {
                  this._filters.push({
                    Field: 'StoryType',
                    Value: item,
                    IsChecked: false
                  });
                });

                resolve(true);
              });
            });
          });
        });
      });     
    });
  }

  
  private _getSearchData(keyword: string = '', sort: number = 0, filters :wwfilters.Filters = null)
  {
    sp.setup({
      spfxContext: this.context
    });  

    let searchURI = '?InplaceSearchQuery=' + encodeURIComponent(keyword);    
    let sortURI = '&SortField=PublishDate&SortDir=Desc';

    if(sort == 1){
      sortURI = '&SortField=Title&SortDir=Asc'
    }
    
    return new Promise((resolve) => {
      const restAPI = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this.properties.ListGUID}')/RenderListDataAsStream` +searchURI + sortURI;
      
      return this.context.spHttpClient.post(restAPI, SPHttpClient.configurations.v1, {
        body: JSON.stringify({
          parameters: {          
            ViewXml: `
              <View>
                <RowLimit Paged="TRUE">5000</RowLimit>
              </View>
            `
          }
        })
      })
      .then((response: SPHttpClientResponse) => 
         {
          response.json().then(items => {
          
            let filteredResults = items.Row;
            if(!this.isInternal){  
              //USER DOES NOT HAVE PERMISSION TO VIEW INTERNAL STORIES        
              filteredResults = filteredResults.filter(item => item['StoryType'] == 'External Case Study');
            }
            resolve(JSON.parse(JSON.stringify(filteredResults)));

          })
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

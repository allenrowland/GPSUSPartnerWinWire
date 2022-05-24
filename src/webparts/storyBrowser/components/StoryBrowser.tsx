import * as React from 'react';
import styles from './StoryBrowser.module.scss';
import { IStoryBrowserProps } from './IStoryBrowserProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as story from '../Story';
import { forEach } from 'lodash';
import JQuery from 'jquery';



const inputStyle = {
  fontFamily: "Sego UI, FontAwesome, sans-serif", 
  placeholder: "Search by partner name  &#xF002"
};

JQuery('.filters-dropdown  .activate').click(function(){
  JQuery('.filters-dropdown .filters').toggleClass('show');
});

export default class StoryBrowser extends React.Component<IStoryBrowserProps, {}> {
  public render(): React.ReactElement<IStoryBrowserProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    let featuredStories: story.Story[];
    let otherStories: story.Story[];

    return (
      <section id="storyBrowser">
        <div className="filtersDropdown"><div className="activate">Filter your results <i className="fa fa-chevron-down"></i></div>
          <div className="filters">
              <div>
                  <p className="uncheck">Uncheck All</p>
                    <strong>Industry:</strong>
                    <ul>
                        <li><input type="checkbox" value="" checked /> Automotive</li>
                        <li><input type="checkbox" value="" checked /> Education</li>
                        <li><input type="checkbox" value="" checked /> Energy</li>
                        <li><input type="checkbox" value="" checked /> Financial Services</li>
                        <li><input type="checkbox" value="" checked /> Government</li>
                    </ul>
                    <br />
                    <strong>Solution area:</strong>
                    <ul>
                        <li><input type="checkbox" value="" checked /> Azure Apps and Infra</li>
                        <li><input type="checkbox" value="" checked /> Azure Data &amp; AI</li>
                        <li><input type="checkbox" value="" checked /> Modern Work (M365 + Surface)</li>
                        <li><input type="checkbox" value="" checked /> Security (Azure + M365) Business Apps</li>
                        <li><input type="checkbox" value="" checked /> (Dynamics + Power Platform)</li>
                        <li><input type="checkbox" value="" checked /> Surface</li>
                    </ul>
                </div>  
                <div><strong>Partner Type:</strong>
                    <ul>
                        <li><input type="checkbox" value="" checked /> ISV</li>
                        <li><input type="checkbox" value="" checked /> Services</li>
                        <li><input type="checkbox" value="" checked /> Other</li>
                     
                    </ul>   <br />
                    <strong>Story Type:</strong>
                    <ul>
                        <li><input type="checkbox" value="" checked /> Internal Win Wire</li>
                        <li><input type="checkbox" value="" checked /> External Case Study</li>                   
                     
                    </ul>   <br />
                    <strong>Keyword/tag filter:</strong>
                    <ul>
                        <li><input type="checkbox" value="" checked /> Compete</li>
                        <li><input type="checkbox" value="" checked /> Marketplace</li>                  
                    </ul>
                </div>
            </div>
          </div>
          <div className="filtersSearch"><input style={inputStyle} type="text" name="namesearch" /> </div>
          {this.stories(featuredStories)}
          {this.stories(otherStories)}
      </section>
    );
  }

  private stories(items: story.Story[], featured: boolean = false): React.ReactElement{

    if(items == null || items.length < 1){
      return (null);
    }
  
    return(
      <div>
        {featured ? (    
          <div id="featuredItems">
            <h4>Featured</h4>
            <div className="items">
            {items.map((value, index) => {
              return this.storyCard(value);
            })}              
          </div>
          </div>
        ) : (  
          <div className="items">
          </div>
        )}
      </div>
    );  
  }

  private storyCard(item: story.Story): React.ReactElement{
    return(
      <div className="item">
        <img src="https://via.placeholder.com/320x179" alt=""/>
        <a className="itemTitle" href="${item.URL}">{item.Title}</a>
        <p className="itemDate"><strong>{story.GSPUSHelper._formatDate(item.PublishDate)}</strong></p>
        <p className="itemPartner">PARTNER: {story.GSPUSHelper._listAll(item.Partner)}</p>
        <p className="itemIndusty">INDUSTRY: {story.GSPUSHelper._listAll(item.Industry)}</p>
        <p className="itemSolution">SOLUTION: {story.GSPUSHelper._listAll(item.SolutionArea)}</p>
        <p className="itemType">STORY TYPE: {item.StoryType}</p>
      </div>
    );
  }

  public sayHello(){
    console.log('Leave me alone');
  }

  


}


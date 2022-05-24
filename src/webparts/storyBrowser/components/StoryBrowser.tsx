import * as React from 'react';
import styles from './StoryBrowser.module.scss';
import { IStoryBrowserProps } from './IStoryBrowserProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as story from '../Story';
import { forEach } from 'lodash';
import JQuery from 'jquery';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
initializeIcons();
const ChevronDownIcon = () => <Icon iconName="ChevronDown" />;
const SearchIcon = () => <Icon iconName="Search" />;



const inputStyle = {
  fontFamily: "Sego UI, Arial, sans-serif", 
  placeholder: "Search by partner name <SearchIcon />"
};


  

export default class StoryBrowser extends React.Component<IStoryBrowserProps, {}> {
  public render(): React.ReactElement<IStoryBrowserProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName    } = this.props;

    let featuredStories: story.Story[];
    let otherStories: story.Story[];
 
    return (
      <section id="storyBrowser" className={styles.storyBrowser}>
        <div id="filters">
          <div className={styles.filtersDropdown}>
            <div onClick={this.toggleFilters} className={styles.activate}>Filter your results <ChevronDownIcon /></div>
            <div className={styles.filters}>
                <div>
                    <p className={styles.uncheck}>Uncheck All</p>
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
          </div>
          <div className={styles.filtersSearch}><input style={inputStyle} placeholder="Search by partner name" type="text" name="namesearch" /> <SearchIcon /> </div>
          <div className={styles.sortResults}>
            <button className={styles.sortBtn}><span>Sort A-Z</span><ChevronDownIcon /></button> 
            <span>187 results</span>
          </div>
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
            <div className={styles.items}>
            {items.map((value, index) => {
              return this.storyCard(value);
            })}              
          </div>
          </div>
        ) : (  
          <div className={styles.items}>
          </div>
        )}
      </div>
    );  
  }

  private storyCard(item: story.Story): React.ReactElement{
    return(
      <div className={styles.item}>
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

  public  toggleFilters(){
    document.getElementById("filters").classList.toggle(styles.show);
  }
  


}


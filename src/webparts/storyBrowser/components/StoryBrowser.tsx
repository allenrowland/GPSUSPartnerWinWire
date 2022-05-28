import * as React from 'react';
import styles from './StoryBrowser.module.scss';
import { IStoryBrowserProps } from './IStoryBrowserProps';
import * as story from '../../Story';
import { forEach } from 'lodash';
import JQuery from 'jquery';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import { Items } from '@pnp/sp/items';
initializeIcons();
const ChevronDownIcon = () => <Icon iconName="ChevronDown" />;
const SearchIcon = () => <Icon iconName="Search" />;
const ChevronRightIcon = () => <Icon iconName="ChevronRight" />;


const inputStyle = {
  fontFamily: "Segoe UI, Arial, sans-serif",
  placeholder: "Search by partner name <SearchIcon />"
};

export default class StoryBrowser extends React.Component<IStoryBrowserProps, {}> {
  public render(): React.ReactElement<IStoryBrowserProps> {
    const {
      stories,
      filters
    } = this.props;

    console.log(this.props.stories);
    //UNCOMMENT FOR PRODUCTION
    //let featuredStories: story.Story[] = this.props.stories.filter(item => item.Featured == "Yes");
    //let otherStories: story.Story[] = this.props.stories.filter(item => item.Featured != "Yes");
    
    let featuredStories: story.Story[] = this.props.stories;
    let otherStories: story.Story[] = this.props.stories;

    return (
      <section id="storyBrowser" className={styles.storyBrowser}>
        <div id="filters" className={styles.filtersContainer}>
          <div className={styles.filtersDropdown}>
            <div onClick={this.toggleFilters} className={styles.activate}>Filter your results <ChevronDownIcon /></div>
            <div className={styles.filters}>
            <div>
                    <p className={styles.uncheck}>Uncheck All</p></div>
                    <div className={styles.filtersOptions}>
                <div className={styles.FirstRow}>
                
                  
                      <strong>Industry:</strong>
                      <ul>
                        {this.props.filters.filter(item => item.Field == 'Industry').map((value, index) =>{
                          return <li><input type="checkbox" value="{value.Value}" checked={value.IsChecked} /> {value.Value}</li>;
                        })}
                      </ul>
                      <br />
                      <strong>Solution area:</strong>
                      <ul>
                        {this.props.filters.filter(item => item.Field == 'SolutionArea').map((value, index) =>{
                          return <li><input type="checkbox" value="{value.Value}" checked={value.IsChecked} /> {value.Value}</li>;
                        })}
                      </ul>
                  </div>
                  <div><strong>Partner Type:</strong>
                      <ul>
                        {this.props.filters.filter(item => item.Field == 'PartnerType').map((value, index) =>{
                          return <li><input type="checkbox" value="{value.Value}" checked={value.IsChecked} /> {value.Value}</li>;
                        })}
                      </ul>   <br />
                      <strong>Story Type:</strong>
                      <ul>
                        {this.props.filters.filter(item => item.Field == 'StoryType').map((value, index) =>{
                          return <li><input type="checkbox" value="{value.Value}" checked={value.IsChecked} /> {value.Value}</li>;
                        })}
                      </ul>   <br />
                      <strong>Keyword/tag filter:</strong>
                      <ul>
                        {this.props.filters.filter(item => item.Field == 'Tags').map((value, index) =>{
                          return <li><input type="checkbox" value="{value.Value}" checked={value.IsChecked} /> {value.Value}</li>;
                        })}
                      </ul>
                  </div>
                  </div>
              </div>
            </div>
            <div className={styles.filtersSearch}>
           
              <input className={styles.partnerSearch} style={inputStyle} placeholder="Search by partner name" type="text" name="namesearch" /> <SearchIcon /> </div>
          <div className={styles.sortResults}>
            <button className={styles.sortBtn}><span>Sort A-Z</span> <ChevronDownIcon /></button>
            <p>{story.GSPUSStoryHelper._resultCount(this.props.stories)}</p>
          </div>
          </div>
       
          {this.stories(featuredStories, true)}
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
          <div id="featuredItems" className={styles.featuredItems}>
            <h4>Featured</h4>
            <div className={styles.items}>
            {items.map((value, index) => {
              return this.storyCard(value);
            })}
          </div>
          </div>
        ) : (
          <div className={styles.items}>
          {items.map((value, index) => {
            return this.storyCard(value);
          })}
          </div>
        )}
      </div>
    );
  }

  private storyCard(item: story.Story): React.ReactElement{
    return(
      <div className={styles.item}>
        <img src="https://via.placeholder.com/320x179" alt=""/>
        <a className={styles.itemTitle} href="${item.URL}">{item.Title}</a>
        <p className={styles.itemDate}><strong>{story.GSPUSStoryHelper._formatDate(item.PublishDate)}</strong></p>
        <p className={styles.itemPartner}><strong>PARTNER:</strong> {story.GSPUSStoryHelper._listAll(item.Partner)}</p>
        <p className={styles.itemIndustry}><strong>INDUSTRY:</strong> {story.GSPUSStoryHelper._listAll(item.Industry)}</p>
        <p className={styles.itemSolution}><strong>SOLUTION:</strong> {story.GSPUSStoryHelper._listAll(item.SolutionArea)}</p>
        <p className={styles.itemType}><strong>STORY TYPE:</strong> {item.StoryType}</p>
       <div className={styles.viewBtn}> <a className={styles.viewStory} href="${item.URL}">View Story <ChevronRightIcon /></a></div>
      </div>
    );
  }

  public  toggleFilters(){
    document.getElementById("filters").classList.toggle(styles.show);
  }



}

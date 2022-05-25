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
      stories,
      tagsFilters,
      industryFilters,
      partnerTypeFilters,
      solutionAreaFilters,
      storyTypeFilters
    } = this.props;

    console.log(this.props.stories);

    let featuredStories: story.Story[] = this.props.stories.filter(item => item.Featured == "Yes");
    let otherStories: story.Story[] = this.props.stories.filter(item => item.Featured != "Yes");

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
                        {this.props.industryFilters.map((value, index) =>{
                          return <li><input type="checkbox" value="" checked /> {value}</li>;
                        })}
                      </ul>
                      <br />
                      <strong>Solution area:</strong>
                      <ul>
                        {this.props.solutionAreaFilters.map((value, index) =>{
                          return <li><input type="checkbox" value="" checked /> {value}</li>;
                        })}
                      </ul>
                  </div>
                  <div><strong>Partner Type:</strong>
                      <ul>
                        {this.props.partnerTypeFilters.map((value, index) =>{
                          return <li><input type="checkbox" value="" checked /> {value}</li>;
                        })}
                      </ul>   <br />
                      <strong>Story Type:</strong>
                      <ul>
                        {this.props.storyTypeFilters.map((value, index) =>{
                          return <li><input type="checkbox" value="" checked /> {value}</li>;
                        })}
                      </ul>   <br />
                      <strong>Keyword/tag filter:</strong>
                      <ul>
                        {this.props.tagsFilters.map((value, index) =>{
                          return <li><input type="checkbox" value="" checked /> {value}</li>;
                        })}
                      </ul>
                  </div>
              </div>
            </div>
          </div>
          <div className={styles.filtersSearch}><input style={inputStyle} placeholder="Search by partner name" type="text" name="namesearch" /> <SearchIcon /> </div>
          <div className={styles.sortResults}>
            <button className={styles.sortBtn}><span>Sort A-Z</span></button>
            <span>{story.GSPUSStoryHelper._resultCount(this.props.stories)}</span>
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
        <a className="itemTitle" href="${item.URL}">{item.Title}</a>
        <p className="itemDate"><strong>{story.GSPUSStoryHelper._formatDate(item.PublishDate)}</strong></p>
        <p className="itemPartner">PARTNER: {story.GSPUSStoryHelper._listAll(item.Partner)}</p>
        <p className="itemIndusty">INDUSTRY: {story.GSPUSStoryHelper._listAll(item.Industry)}</p>
        <p className="itemSolution">SOLUTION: {story.GSPUSStoryHelper._listAll(item.SolutionArea)}</p>
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

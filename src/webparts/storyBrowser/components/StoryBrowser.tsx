import * as React from 'react';
import styles from './StoryBrowser.module.scss';
import { IStoryBrowserProps } from './IStoryBrowserProps';
import * as story from '../../Story';



const inputStyle = {
  fontFamily: "Sego UI, FontAwesome, sans-serif", 
  placeholder: "Search by partner name  &#xF002"
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
      <section id="storyBrowser">
        <div id="filters">
          <div className={styles.filtersDropdown}>
            <div className={styles.activate}>Filter your results <i className="fa fa-chevron-down"></i></div>
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
          <div className={styles.filtersSearch}><input style={inputStyle} placeholder="Search by partner name" type="text" name="namesearch" /> </div>
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


}


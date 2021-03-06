import * as React from 'react';
import styles from './StoryBrowser.module.scss';
import { IStoryBrowserProps } from './IStoryBrowserProps';
import * as story from '../../Story';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import FilterGroup from '../components/FilterGroup';
import { filter } from 'lodash';
initializeIcons();
const ChevronDownIcon = () => <Icon iconName="ChevronDown" />;
const SearchIcon = () => <Icon iconName="Search" />;
const ChevronRightIcon = () => <Icon iconName="ChevronRight" />;

const inputStyle = {
  fontFamily: "Segoe UI, Arial, sans-serif",
  placeholder: "Search by partner name <SearchIcon />"
};

export interface IStoryBrowserState {
  _storyBrowserStateFilters: string[];
  _storyBrowserStateSearchTerm: string;
  _storyBrowserStateSort: string;
} 

export default class StoryBrowser extends React.Component<IStoryBrowserProps, IStoryBrowserState> {

  public constructor(props: IStoryBrowserProps, state: IStoryBrowserState){  
    super(props);
    
    this.state = {
      _storyBrowserStateFilters: [],
      _storyBrowserStateSearchTerm: '',
      _storyBrowserStateSort: '0'
    };
  }

  public render(): React.ReactElement<IStoryBrowserProps> {
    const {
      stories,
      filters
    } = this.props;

    let filteredStories = this.filterStories(this.props.stories);
    let featuredStories: story.Story[] = filteredStories.filter(item => item.Featured == "Yes").slice(0, 3);

    return (
      <section id="storyBrowser" className={styles.storyBrowser} onClick={this.hideFilters}>
        <div id="filters"  className={styles.filtersContainer}>
          <div className={styles.filtersDropdown}>
            <div onClick={this.toggleFilters} className={styles.activate}>Filter your results <ChevronDownIcon /></div>
        
            <div className={styles.filters}>
            <button type="button" className={styles.uncheck} onClick={this.onClearAllClick}>Uncheck All</button>                 
                 
              <div className={styles.filterOptions}>
            
                <div>
                   
                    <FilterGroup
                      title = {'Industry'}
                      groupName={'Industry'}
                      filterOptions={this.props.filters.filter(item => item.Field == 'Industry')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />                
                    <FilterGroup
                      title = {'Solution Area'}
                      groupName={'SolutionArea'}
                      filterOptions={this.props.filters.filter(item => item.Field == 'SolutionArea')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                    <FilterGroup
                      title={'File Type'}
                      groupName={'LinkType'}
                      filterOptions={this.props.filters.filter(item => item.Field == 'LinkType')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                  </div>
                  <div>                
                    <FilterGroup
                      title={'Partner Type'}
                      groupName={'PartnerType'}
                      filterOptions={this.props.filters.filter(item => item.Field == 'PartnerType')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                    <FilterGroup
                      title={'Story Type'}
                      groupName={'StoryType'}
                      filterOptions={this.props.filters.filter(item => item.Field == 'StoryType')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                    <FilterGroup
                      title={'Tags'}
                      groupName={'Tags'}
                      filterOptions={this.props.filters.filter(item => item.Field == 'Tags')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.filtersSearch}><input style={inputStyle} placeholder="Search by keyword" type="text" name="namesearch" onChange={this.handleSearchChange} value={this.state._storyBrowserStateSearchTerm != '' ? this.state._storyBrowserStateSearchTerm : null}  /> <SearchIcon/> </div>
          <div className={styles.sortResults}>
              <select className={styles.sortBtn} value={this.state._storyBrowserStateSort} onChange={this.handleSortChange}>
                <option value="0">Sort Publish Date Desc</option>
                <option value="1">Sort Publish Date Asc</option>
                <option value="2">Sort A-Z</option>
                <option value="3">Sort Z-A</option>
              </select>
            <p>{story.GSPUSStoryHelper._resultCount(filteredStories)}</p>
          </div>
          </div>
         
          {this.stories(featuredStories, true)}
          {this.stories(filteredStories)}

      </section>
    );
  }

  private compareString(story1 :story.Story, story2: story.Story, key: string) 
  {
      if (story1[key] < story2[key]) return -1;
      if (story1[key] > story1[key]) return 1;
      return 0;
  }

  private compareDate(story1 :story.Story, story2: story.Story, key: string) 
  {
    if (Date.parse(story1[key]) > Date.parse(story2[key])) return 1;
    if (Date.parse(story1[key]) < Date.parse(story2[key])) return -1;
    return 0;
  }

  private filterStories(stories: story.Story[]){

    switch(this.state._storyBrowserStateSort) {
      case '1':
        //Sort by publish date ascending
        stories = stories.sort((a, b) => this.compareDate(a, b, 'PublishDate'));
        break;
      case '2':
        //Sort by title A-Z
        stories = stories.sort((a, b) => this.compareString(a, b, 'Title'));
        break;
      case '3':
        //Sort by title Z-A
        stories = stories.sort((a, b) => this.compareString(b, a, 'Title'));
        break;
      default:
        //Sort by publish date descending
        stories = stories.sort((b, a) => this.compareDate(a, b, 'PublishDate'));
    }
    
    if(this.state._storyBrowserStateSearchTerm != null && this.state._storyBrowserStateSearchTerm != ''){
      let queriedStories :story.Story[] = [];
      stories.forEach(storyItem => {
        let pushStory = false;
        let partners :string[] = typeof(storyItem['Partner']) == "string" ? ['Partner'] : (Object)(storyItem['Partner']);
        for (const i in partners){
          if(partners[i].toLowerCase().indexOf((this.state._storyBrowserStateSearchTerm).toLowerCase()) > -1){
            pushStory = true;
          }
        }       
        
        let tags :string[] = typeof(storyItem['Tags']) == "string" ? ['Tags'] : (Object)(storyItem['Tags']);
        for (const i in tags){
          if(tags[i].toLowerCase().indexOf((this.state._storyBrowserStateSearchTerm).toLowerCase()) > -1){
            pushStory = true;
          }
        }  

        if(storyItem.Title.toLowerCase().indexOf((this.state._storyBrowserStateSearchTerm).toLowerCase()) > -1){
          pushStory = true;
        }

        if(pushStory){
          queriedStories.push(storyItem);
        }
      });
      stories = queriedStories;
    }

    if(this.state._storyBrowserStateFilters.length > 0){
      let cfilters = this.state._storyBrowserStateFilters;
      let filteredStories :story.Story[] = [];
      
      
      stories.forEach(storyItem => {
        //let pushStory = false; (OR)
        let filterMatches = 0; //(AND)

        cfilters.forEach(filterItem => {
          let cfilter = filterItem.split('|')[0];
          let group = filterItem.split('|')[1];
          let storyFilters :string[] = typeof(storyItem[group]) == "string" ? [storyItem[group]] : (Object)(storyItem[group]);
          for (const i in storyFilters){
            if(cfilter == storyFilters[i]){
              //pushStory = true; (OR)
              filterMatches++; //(AND)
            }
          }         
        });

        //if(pushStory){ (OR)
        if(filterMatches == cfilters.length){ //(AND)
          filteredStories.push(storyItem);
        }
      });

      return filteredStories;
    }

    return stories;
  }

  public handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    this.setState({_storyBrowserStateSearchTerm: searchValue});
  }

  public handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    this.setState({_storyBrowserStateSort: sortValue});
  }

  public onSubmissionTypeFilterChange = (cfilter: string, isActive: boolean) => {
    const currentFilters = this.state._storyBrowserStateFilters.filter((item) => item !== cfilter);
    if (isActive) {
      currentFilters.push(cfilter);
    }
    
    this.setState({_storyBrowserStateFilters: currentFilters});
  }

  private stories(items: story.Story[], featured: boolean = false): React.ReactElement{

    //remove featured section if filters applied or there are no stories to show
    if(items == null || items.length < 1 || (featured && this.state._storyBrowserStateFilters.length > 0)){
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
  public onClearAllClick = () => {
    this.setState({
      _storyBrowserStateFilters: []
    });
  }

  private storyCard(item: story.Story): React.ReactElement{
    return(
      <div className={styles.item}>
        <div className="image">
          <img src={item.Image['serverRelativeUrl']} alt=""/>
        </div>
        <a className={styles.itemTitle} href={item.URL + (item.Download == "Yes" ? "&download=1" : "")} target="_blank">{item.Title}</a>
        <p className={styles.itemDate}><strong>{story.GSPUSStoryHelper._formatDate(item.PublishDate)}</strong></p>
        <p className={styles.itemPartner}><strong>PARTNER:</strong> {story.GSPUSStoryHelper._listAll(item.Partner)}</p>
        <p className={styles.itemIndustry}><strong>INDUSTRY:</strong> {story.GSPUSStoryHelper._listAll(item.Industry)}</p>
        <p className={styles.itemSolution}><strong>SOLUTION:</strong> {story.GSPUSStoryHelper._listAll(item.SolutionArea)}</p>
        <p className={styles.itemType}><strong>STORY TYPE:</strong> {item.StoryType}</p>
        <div className={styles.viewBtn}> <a className={styles.viewStory} href={item.URL + (item.Download == "Yes" ? "&download=1" : "")} target="_blank">View Story <ChevronRightIcon /></a></div>
      </div>
    );
  }

  public  toggleFilters(e){
    document.getElementById("filters").classList.toggle(styles.show);
  }

  public  hideFilters(e){
    if (document.getElementById('filters').contains(e.target)){
      // Clicked in box
      // console.log('in box');
    } else{
      // Clicked outside the box
      // console.log('outside box');
      document.getElementById("filters").classList.remove(styles.show);
    }
  }

}

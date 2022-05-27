import * as React from 'react';
import styles from './StoryBrowser.module.scss';
import { IStoryBrowserProps } from './IStoryBrowserProps';
import * as story from '../../Story';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import FilterGroup from '../components/FilterGroup';
initializeIcons();
const ChevronDownIcon = () => <Icon iconName="ChevronDown" />;
const SearchIcon = () => <Icon iconName="Search" />;



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
      _storyBrowserStateSort: '0',
    };
  }

  public render(): React.ReactElement<IStoryBrowserProps> {
    const {
      stories,
      filters
    } = this.props;

    let filteredStories = this.filterStories(this.props.stories);
    let featuredStories: story.Story[] = filteredStories.filter(item => item.Featured == "Yes");
    let otherStories: story.Story[] = filteredStories.filter(item => item.Featured != "Yes");

    return (
      <section id="storyBrowser" className={styles.storyBrowser}>
        <div id="filters">
          <div className={styles.filtersDropdown}>
            <div onClick={this.toggleFilters} className={styles.activate}>Filter your results <ChevronDownIcon /></div>
            <div className={styles.filters}>
                <div>
                    <button type="button" className={styles.uncheck} onClick={this.onClearAllClick}>Uncheck All</button>                 
                 
                    <FilterGroup
                      groupName={'Industry'}
                      filterOptions={filters.filter(item => item.Field == 'Industry')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />                
                    <FilterGroup
                      groupName={'SolutionArea'}
                      filterOptions={filters.filter(item => item.Field == 'SolutionArea')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                  </div>
                  <div>                
                    <FilterGroup
                      groupName={'PartnerType'}
                      filterOptions={filters.filter(item => item.Field == 'PartnerType')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                    <FilterGroup
                      groupName={'StoryType'}
                      filterOptions={filters.filter(item => item.Field == 'StoryType')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                    <FilterGroup
                      groupName={'Tags'}
                      filterOptions={filters.filter(item => item.Field == 'Tags')}
                      onChange={this.onSubmissionTypeFilterChange}
                      activeFilters={this.state._storyBrowserStateFilters}
                    />
                  </div>
              </div>
            </div>
          </div>
          <div className={styles.filtersSearch}><input style={inputStyle} placeholder="Search by partner name" type="text" name="namesearch" onChange={this.handleSearchChange} value={this.state._storyBrowserStateSearchTerm != '' ? this.state._storyBrowserStateSearchTerm : null}  /> <SearchIcon/> </div>
          <div className={styles.sortResults}>
            <select value={this.state._storyBrowserStateSort} onChange={this.handleSortChange}>
              <option value="0">Sort Publish Date Desc</option>
              <option value="1">Sort Publish Date Asc</option>
              <option value="2">Sort A-Z</option>
              <option value="3">Sort Z-A</option>
            </select>
            <span>{story.GSPUSStoryHelper._resultCount(filteredStories)}</span>
          </div>
          {this.stories(featuredStories, true)}
          {this.stories(otherStories)}

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
    if (story1[key] > story2[key]) return 1;
    if (story1[key] < story2[key]) return -1;
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
      console.log(this.state._storyBrowserStateSearchTerm);
      let queriedStories :story.Story[] = [];
      stories.forEach(storyItem => {
        let pushStory = false;
        let partners :string[] = typeof(storyItem['Partner']) == "string" ? ['Partner'] : (Object)(storyItem['Partner']);
        for (const i in partners){
          if(partners[i].toLowerCase().indexOf((this.state._storyBrowserStateSearchTerm).toLowerCase()) > -1){
            pushStory = true;
          }
        }  

        if(pushStory){
          queriedStories.push(storyItem);
        }
      });
      stories = queriedStories;
    }

    if(this.state._storyBrowserStateFilters.length > 0){
      let filters = this.state._storyBrowserStateFilters;
      let filteredStories :story.Story[] = [];
      
      
      stories.forEach(storyItem => {
        let pushStory = false;
        filters.forEach(filterItem => {
          let filter = filterItem.split('|')[0];
          let group = filterItem.split('|')[1];
          let storyFilters :string[] = typeof(storyItem[group]) == "string" ? [storyItem[group]] : (Object)(storyItem[group]);
          for (const i in storyFilters){
            if(filter == storyFilters[i]){
              pushStory = true;
            }
          }         
        });

        if(pushStory){
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

  public onSubmissionTypeFilterChange = (filter: string, isActive: boolean) => {
    const currentFilters = this.state._storyBrowserStateFilters.filter((item) => item !== filter);
    if (isActive) {
      currentFilters.push(filter);
    }
    
    this.setState({_storyBrowserStateFilters: currentFilters});
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
  public onClearAllClick = () => {
    this.setState({
      _storyBrowserStateFilters: []
    });
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

  public  toggleFilters(){
    document.getElementById("filters").classList.toggle(styles.show);
  }



}

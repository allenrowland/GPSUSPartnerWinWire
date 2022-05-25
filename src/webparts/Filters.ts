export interface Filters
{
  Industry: string[];
  SolutionArea: string[];
  PartnerType: string[];
  StoryType: string[];
  Tags: string[];
}


export class GSPUSFilterHelper {

  public industry: string; 
  public solutionArea: string;
  public partnerType: string;
  public storyType: string;
  public tags: string;
  public filters: Filters;


  public GPSUSFilterHelper(_industry :string = "", _solutionArea :string = "", _partnerType :string, _storyType :string, _tags :string){
    this.industry = _industry;
    this.solutionArea = _solutionArea;
    this.partnerType = _partnerType;
    this.storyType = _storyType;
    this.tags = _tags;

    this.filters = {
      Industry: this._parseFilters(this.industry),
      SolutionArea: this._parseFilters(this.solutionArea),
      PartnerType: this._parseFilters(this.partnerType),
      StoryType: this._parseFilters(this.storyType),
      Tags: this._parseFilters(this.tags)
    };
  }

  public _parseFilters(filtersRaw: string, delimiter: string = '|'): string[]{
    if(filtersRaw != null && filtersRaw != ""){
      return filtersRaw.split(delimiter);
    }else{
      return [];
    }

  }

  public _filterURIString(_filters: string[]): string{
    let filterString :string = "";
    _filters.forEach((item, i) => {
      if(i > 0){
        filterString += ',';
      }
      filterString += item;
    });
    return filterString;
  }

  public createFilterURI() :string{

    let FilterFields :string = '&FilterField1=Industry&FilterField2=SolutionArea&FilterField3=PartnerType&FilterField4=StoryType&FilterField5=Tags';
    let IndustryFilters :string = '&FilterValues1=' + this._filterURIString(this.filters.Industry);
    let SolutionAreaFilters :string = '&FilterValues2=' + this._filterURIString(this.filters.SolutionArea);
    let PartnerTypeFilters :string = '&FilterValues3=' + this._filterURIString(this.filters.PartnerType);
    let StoryTypeFilters :string = '&FilterValues4=' + this._filterURIString(this.filters.StoryType);
    let TagsFilters :string = '&FilterValues5=' + this._filterURIString(this.filters.Tags);
 
    return FilterFields + IndustryFilters + SolutionAreaFilters +PartnerTypeFilters + StoryTypeFilters + TagsFilters;
  }
  

}
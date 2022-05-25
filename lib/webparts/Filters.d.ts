export interface Filters {
    Industry: string[];
    SolutionArea: string[];
    PartnerType: string[];
    StoryType: string[];
    Tags: string[];
}
export declare class GSPUSFilterHelper {
    industry: string;
    solutionArea: string;
    partnerType: string;
    storyType: string;
    tags: string;
    filters: Filters;
    GPSUSFilterHelper(_industry: string, _solutionArea: string, _partnerType: string, _storyType: string, _tags: string): void;
    _parseFilters(filtersRaw: string, delimiter?: string): string[];
    _filterURIString(_filters: string[]): string;
    createFilterURI(): string;
}
//# sourceMappingURL=Filters.d.ts.map
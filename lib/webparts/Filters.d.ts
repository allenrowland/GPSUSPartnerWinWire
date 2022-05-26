export interface Search {
    Filters: Filter[];
    Keyword: string;
    Sort: Sort;
}
export interface Filter {
    Field: string;
    Value: string;
    IsChecked: boolean;
}
export interface Sort {
    Title: string;
    Value: number;
}
//# sourceMappingURL=Filters.d.ts.map
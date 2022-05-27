export interface Stories {
    value: Story[];
}
export interface Story {
    Id: number;
    Title: string;
    PublishDate: Date;
    Image: object;
    Description: string;
    URL: object;
    LinkType: {
        Element: string;
    };
    Partner: {
        Element: string;
    };
    Industry: {
        Element: string;
    };
    SolutionArea: {
        Element: string;
    };
    PartnerType: {
        Element: string;
    };
    StoryType: string;
    Tags: {
        Element: string;
    };
    Featured: string;
}
export interface SPList {
    Title: string;
    ID: string;
}
export declare class GSPUSStoryHelper {
    static _listAll(items: object, spacer?: string): string;
    static _formatDate(date: Date): string;
    static _resultCount(stories: Story[]): string;
}
//# sourceMappingURL=Story.d.ts.map
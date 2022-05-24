export interface Stories {
    value: Story[];
}
export interface Story {
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
    Featured: Boolean;
}
export declare class GSPUSHelper {
    static _listAll(items: object, spacer?: string): string;
    static _formatDate(date: Date): string;
    static _resultCount(stories: Story[]): string;
}
//# sourceMappingURL=Story.d.ts.map
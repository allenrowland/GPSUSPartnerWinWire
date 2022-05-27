import * as React from 'react';
import { IStoryBrowserProps } from './IStoryBrowserProps';
export interface IStoryBrowserState {
    _storyBrowserStateFilters: string[];
    _storyBrowserStateSearchTerm: string;
    _storyBrowserStateSort: string;
}
export default class StoryBrowser extends React.Component<IStoryBrowserProps, IStoryBrowserState> {
    constructor(props: IStoryBrowserProps, state: IStoryBrowserState);
    render(): React.ReactElement<IStoryBrowserProps>;
    private compareString;
    private compareDate;
    private filterStories;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onSubmissionTypeFilterChange: (filter: string, isActive: boolean) => void;
    private stories;
    onClearAllClick: () => void;
    private storyCard;
    toggleFilters(): void;
}
//# sourceMappingURL=StoryBrowser.d.ts.map
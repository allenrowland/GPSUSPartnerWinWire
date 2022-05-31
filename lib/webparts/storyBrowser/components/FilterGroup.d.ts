import * as React from 'react';
import * as wwfilters from '../../Filters';
interface IFilterGroupProps {
    title: string;
    groupName: string;
    filterOptions: wwfilters.Filter[];
    activeFilters: string[];
    isChecked?: boolean;
    onChange?: (value: string, isActive: boolean) => void;
}
interface IFilterGroupState {
    _storyBrowserStateFilters: string[];
}
export default class FilterGroup extends React.Component<IFilterGroupProps, IFilterGroupState> {
    state: {
        _storyBrowserStateFilters: any[];
    };
    render(): JSX.Element;
    private onChange;
}
export {};
//# sourceMappingURL=FilterGroup.d.ts.map
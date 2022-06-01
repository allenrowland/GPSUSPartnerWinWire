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
    public state = {
        _storyBrowserStateFilters: [],
    };

    public render() {
        const { filterOptions, groupName, activeFilters, title } = this.props;
        return (
            <div>
                <strong>{title}:</strong>
                <ul>
                {filterOptions.map((filterValue) => (
                        <li>
                            <label>
                            <input type="checkbox" 
                                value={filterValue.Value + '|' + groupName}
                                checked={activeFilters.indexOf(filterValue.Value + '|' + groupName) > -1}
                                onChange={this.onChange}
                                
                            />
                            <div>{filterValue.Value}</div>
                            </label>
                        </li>
                    ))} 
                </ul>
            </div>
            
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        const filterValue = event.target.value;
      
        if (onChange) {
            onChange(filterValue, event.target.checked);
        }
    }
}
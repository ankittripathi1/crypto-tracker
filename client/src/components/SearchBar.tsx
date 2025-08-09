import React from 'react';
import { Search,Globe,X, TrendingUp, TrendingDown  } from 'lucide-react';
import type { FilterType } from '../types/crypto';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
    filter,
    onFilterChange,
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by name or symbol..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                />
                {searchTerm && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <FilterButton
                    label="All"
                    icon={<Globe className="w-4 h-4 mr-1.5" />}
                    isActive={filter === 'all'}
                    onClick={() => onFilterChange('all')}
                />
                <FilterButton
                    label="Gainers"
                    icon={<TrendingUp className="w-4 h-4 mr-1.5" />}
                    isActive={filter === 'positive'}
                    onClick={() => onFilterChange('positive')}
                />
                <FilterButton
                    label="Losers"
                    icon={<TrendingDown className="w-4 h-4 mr-1.5" />}
                    isActive={filter === 'negative'}
                    onClick={() => onFilterChange('negative')}
                />
            </div>
        </div>
    );
};

interface FilterButtonProps {
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, icon, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 border ${isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

export default SearchBar;

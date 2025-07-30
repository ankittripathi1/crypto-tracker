import React from 'react';
import { Search, Filter } from 'lucide-react';
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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search cryptocurrencies..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
            </div>

            <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value as FilterType)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                    <option value="all">All Coins</option>
                    <option value="positive">Gainers Only</option>
                    <option value="negative">Losers Only</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
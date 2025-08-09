import React, { useState, useMemo } from 'react';
import { RefreshCw, Clock } from 'lucide-react';
import type { CoinData, SortField, SortDirection, FilterType } from '../types/crypto';
import { useCryptoData } from '../hooks/useCryptoData';
import CryptoTable from './CryptoTable';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { formatTimestamp } from '../utils/formatters';
import SearchBar from './SearchBar';

const Dashboard: React.FC = () => {
    const { data, loading, error, lastUpdated, refetch } = useCryptoData();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortField, setSortField] = useState<SortField>('marketCap');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredAndSortedData = useMemo(() => {
        let filtered = data.filter((coin: CoinData) => {
            const matchesSearch =
                coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter =
                filter === 'all' ||
                (filter === 'positive' && coin.changePercent >= 0) ||
                (filter === 'negative' && coin.changePercent < 0);

            return matchesSearch && matchesFilter;
        });

        filtered.sort((a, b) => {
            let aValue: number | string;
            let bValue: number | string;

            switch (sortField) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'symbol':
                    aValue = a.symbol.toLowerCase();
                    bValue = b.symbol.toLowerCase();
                    break;
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'marketCap':
                    aValue = a.marketCap;
                    bValue = b.marketCap;
                    break;
                case 'changePercent':
                    aValue = a.changePercent;
                    bValue = b.changePercent;
                    break;
                default:
                    return 0;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return sortDirection === 'asc'
                    ? (aValue as number) - (bValue as number)
                    : (bValue as number) - (aValue as number);
            }
        });

        return filtered;
    }, [data, searchTerm, sortField, sortDirection, filter]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    if (loading && data.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="container mx-auto px-4 py-8">
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    if (error && data.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="container mx-auto px-4 py-8">
                    <ErrorMessage message={error} onRetry={refetch} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
                        Crypto Tracker
                    </h1>
                    <p className="text-gray-500">
                        Your real-time guide to the crypto market
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        filter={filter}
                        onFilterChange={setFilter}
                    />
                    <div className="flex items-center space-x-4">
                        {lastUpdated && (
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1.5" />
                                <span>Last updated: {formatTimestamp(lastUpdated)}</span>
                            </div>
                        )}
                        <button
                            onClick={() => refetch()}
                            disabled={loading}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
                        </button>
                    </div>
                </div>

                {/* Error Banner */}
                {error && data.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-yellow-800">
                            <strong>Warning:</strong> {error}. Showing cached data.
                        </p>
                    </div>
                )}

                {/* Results Info */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing {filteredAndSortedData.length} of {data.length} cryptocurrencies
                        {searchTerm && ` matching "${searchTerm}"`}
                        {filter !== 'all' && ` (${filter} only)`}
                    </p>
                </div>

                {/* Table */}
                {filteredAndSortedData.length > 0 ? (
                    <CryptoTable
                        data={filteredAndSortedData}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                    />
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No cryptocurrencies match your current filters.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilter('all');
                            }}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Auto-refresh Notice */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Data automatically refreshes every 30 minutes
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
import { ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import type { CoinData, SortDirection, SortField } from "../types/crypto";
import { formatMarketCap, formatPercentage, formatPrice } from "../utils/formatters";


interface CryptoTableProps {
    data: CoinData[];
    sortField: SortField;
    sortDirection: SortDirection;
    onSort: (field: SortField) => void;
}

export default function CryptoTable({ data, sortField, sortDirection, onSort }: CryptoTableProps) {
    const getSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <div className="w-4 h-4" />
        }
        return sortDirection === 'asc' ?
            <ChevronUp className="w-4 h-4" /> :
            <ChevronDown className="w-4 h-4" />;
    }
    const getPercentageColor = (percentage: number) => {
        return percentage > 0 ? 'text-green-600' : 'text-red-600';
    }

    const getPercentageIcon = (percentage: number) => {
        return percentage >= 0 ?
            <TrendingUp className="w-4 h-4" /> :
            <TrendingDown className="w-4 h-4" />;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                <button
                                    onClick={() => onSort('name')}
                                    className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                    <span>Name</span>
                                    {getSortIcon('name')}
                                </button>
                            </th>
                            <th className="px-6 py-4 text-left hidden md:table-cell">
                                <button
                                    onClick={() => onSort('symbol')}
                                    className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                    <span>Symbol</span>
                                    {getSortIcon('symbol')}
                                </button>
                            </th>
                            <th className="px-6 py-4 text-right ">
                                <button
                                    onClick={() => onSort('price')}
                                    className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                    <span>Price</span>
                                    {getSortIcon('price')}
                                </button>
                            </th>
                            <th className="px-6 py-4 text-right hidden md:table-cell">
                                <button
                                    onClick={() => onSort('marketCap')}
                                    className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                    <span>Market Cap</span>
                                    {getSortIcon('marketCap')}
                                </button>
                            </th>
                            <th className="px-6 py-4 text-right">
                                <button
                                    onClick={() => onSort('changePercent')}
                                    className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                    <span>Change (%)</span>
                                    {getSortIcon('changePercent')}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((coin, index) => (
                            <tr
                                key={coin.coinId}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{coin.name}</p>
                                            <p className="text-sm text-gray-500 sm:hidden">{coin.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden sm:table-cell">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {coin.symbol.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="font-semibold text-gray-900">
                                        {formatPrice(coin.price)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right hidden md:table-cell">
                                    <span className="text-gray-700">
                                        {formatMarketCap(coin.marketCap)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className={`flex items-center justify-end space-x-1 ${getPercentageColor(coin.changePercent)}`}>
                                        {getPercentageIcon(coin.changePercent)}
                                        <span className="font-semibold">
                                            {formatPercentage(coin.changePercent ?? 0)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

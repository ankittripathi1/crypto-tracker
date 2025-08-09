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
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <button
                                    onClick={() => onSort('name')}
                                    className="flex items-center space-x-1 font-semibold hover:text-blue-600 transition-colors duration-200"
                                >
                                    <span>Name</span>
                                    {getSortIcon('name')}
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                <button
                                    onClick={() => onSort('symbol')}
                                    className="flex items-center space-x-1 font-semibold hover:text-blue-600 transition-colors duration-200"
                                >
                                    <span>Symbol</span>
                                    {getSortIcon('symbol')}
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                <button
                                    onClick={() => onSort('price')}
                                    className="flex items-center space-x-1 font-semibold hover:text-blue-600 transition-colors duration-200 ml-auto"
                                >
                                    <span>Price</span>
                                    {getSortIcon('price')}
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-3 text-right hidden md:table-cell">
                                <button
                                    onClick={() => onSort('marketCap')}
                                    className="flex items-center space-x-1 font-semibold hover:text-blue-600 transition-colors duration-200 ml-auto"
                                >
                                    <span>Market Cap</span>
                                    {getSortIcon('marketCap')}
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                <button
                                    onClick={() => onSort('changePercent')}
                                    className="flex items-center space-x-1 font-semibold hover:text-blue-600 transition-colors duration-200 ml-auto"
                                >
                                    <span>24h Change</span>
                                    {getSortIcon('changePercent')}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((coin) => (
                            <tr
                                key={coin.coinId}
                                className="bg-white hover:bg-gray-50 transition-colors duration-150"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <img src={coin.iconUrl} alt={coin.name} className="w-8 h-8 rounded-full" />
                                        <div>
                                            <p className="font-bold text-gray-900">{coin.name}</p>
                                            <p className="text-sm text-gray-500 md:hidden">{coin.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="px-2 py-1 font-semibold text-gray-700 bg-gray-100 rounded-md">
                                        {coin.symbol.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="font-semibold text-gray-800">
                                        {formatPrice(coin.price)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right hidden md:table-cell">
                                    <span className="text-gray-600">
                                        {formatMarketCap(coin.marketCap)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className={`flex items-center justify-end space-x-1.5 ${getPercentageColor(coin.changePercent)}`}>
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

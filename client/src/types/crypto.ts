export interface CoinGeckoResponse {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    last_updated: string;
}

export interface CoinData {
    coinId: string;
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
    changePercent: number;
    timestamp: string;
    iconUrl?: string;
}

export interface ApiResponse<T>{
    success: boolean;
    data?: T ;
    error?: string;
    message?: string;
}

export type SortField = 'name' | 'symbol' | 'price' | 'marketCap' | 'changePercent';
export type SortDirection = 'asc' | 'desc';
export type FilterType = 'all' | 'positive' | 'negative';
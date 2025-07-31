import { useCallback, useEffect, useState } from "react";
import type { ApiResponse, CoinData } from "../types/crypto";


const API_BASE_URL = 'https://crypto-tracker-sc9g.onrender.com';


export const useCryptoData = ()=>{
    const [data, setData] = useState<CoinData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchCryptoData = useCallback(async ()=>{
        try{
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/api/coins`);

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ApiResponse<CoinData[]> = await response.json();

            if(result.success && result.data){
                setData(result.data);
                setLastUpdated(new Date());
            }else{
                throw new Error(result.error || result.message || "Failed to fetch data");
            }

        }catch(error){
            console.error("Error fetching crypto data:", error);
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }finally{
            setLoading(false);
        }
    },[]);

    const storeHistorySnapshot = useCallback(async ()=>{
        try{
            await fetch(`${API_BASE_URL}/api/history`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        }catch(error){
            console.error("Error storing history snapshot:",error);
        }
    },[]);

    useEffect(()=>{
        fetchCryptoData();

        const interval = setInterval(()=>{
            fetchCryptoData();
            storeHistorySnapshot();
        },1800000);

        return () => clearInterval(interval);
    },[fetchCryptoData, storeHistorySnapshot]);

    return {
        data,
        loading,
        error,
        lastUpdated,
        refetch: fetchCryptoData,
    }
}
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-8 max-w-lg w-full shadow-md">
                <div className="flex">
                    <div className="py-1">
                        <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong.</h3>
                        <p className="text-red-700 mb-5">We couldn't fetch the latest cryptocurrency data. Please check your connection or try again in a moment.</p>
                        <p className="text-sm text-red-600 mb-5">Error: {message}</p>
                        <button
                            onClick={onRetry}
                            className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
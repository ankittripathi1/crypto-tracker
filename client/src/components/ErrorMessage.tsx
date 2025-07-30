import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
                <p className="text-red-600 mb-4">{message}</p>
                <button onClick={onRetry} className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                </button>
            </div>
        </div>
    );
}
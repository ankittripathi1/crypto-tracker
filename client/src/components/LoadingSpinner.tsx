export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="mt-4 text-gray-600 font-semibold text-lg">Loading Market Data...</span>
        </div>
    )
}
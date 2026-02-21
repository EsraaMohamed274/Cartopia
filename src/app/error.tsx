"use client"

export default function Error() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-7xl font-bold text-red-600 mb-4">
                Oops!
            </h1>   
            <h2 className="text-2xl font-semibold mb-2">
                Something went wrong.
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
                An unexpected error has occurred while loading the products. Please try again later.
            </p>
        </div>
    );
}
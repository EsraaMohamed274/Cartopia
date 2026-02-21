import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-7xl font-bold text-black mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

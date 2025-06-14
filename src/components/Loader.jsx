export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Loading your todos</h2>
        <p className="text-gray-500">Please wait a moment...</p>
      </div>
    </div>
  );
}
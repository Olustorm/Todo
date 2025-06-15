export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-6"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-ping mx-auto opacity-20"></div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Loading your todos...
        </h2>
        <p className="text-gray-600">Please wait while we fetch your tasks</p>
      </div>
    </div>
  );
}
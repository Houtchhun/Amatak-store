export default function Loading() {
  // Provide default searchQuery and setSearchQuery to Header if used here in the future
  // This prevents errors if Header is rendered in this loading state
  // Example:
  // <Header searchQuery="" setSearchQuery={() => {}} />
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    </div>
  )
}

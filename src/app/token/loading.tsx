// T075 - Token page loading state
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-charcoal/90">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Presale card skeleton */}
        <div className="mb-16">
          <div className="h-96 bg-white/10 rounded-2xl animate-pulse" />
        </div>

        {/* Token economics skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="h-64 bg-white/10 rounded-xl animate-pulse" />
          <div className="h-64 bg-white/10 rounded-xl animate-pulse" />
        </div>

        {/* Roadmap skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/10 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

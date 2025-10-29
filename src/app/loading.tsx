// T075 - Global loading state with skeleton
export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="h-screen bg-gradient-to-br from-charcoal to-charcoal/80 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="h-16 bg-white/10 rounded-lg animate-pulse mx-auto w-3/4" />
          <div className="h-8 bg-white/10 rounded-lg animate-pulse mx-auto w-2/3" />
          <div className="flex gap-4 justify-center">
            <div className="h-14 w-40 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-14 w-40 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content skeletons */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-12 bg-stone/50 rounded-lg animate-pulse w-1/3 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-64 bg-stone/50 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

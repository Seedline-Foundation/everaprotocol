// T075 - Whitepaper page loading state
export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of contents skeleton */}
          <div className="lg:col-span-1">
            <div className="h-8 bg-stone/50 rounded animate-pulse mb-4 w-2/3" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-6 bg-stone/50 rounded animate-pulse" />
              ))}
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              <div className="h-12 bg-stone/50 rounded animate-pulse w-3/4" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-8 bg-stone/50 rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-stone/50 rounded animate-pulse" />
                  <div className="h-4 bg-stone/50 rounded animate-pulse" />
                  <div className="h-4 bg-stone/50 rounded animate-pulse w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

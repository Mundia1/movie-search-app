function SkeletonCard() {
    return (
      <div className="card">
        <div className="skeleton w-full h-72"></div>
        <div className="p-4 space-y-3">
          <div className="skeleton h-6 w-3/4"></div>
          <div className="skeleton h-4 w-1/2"></div>
        </div>
      </div>
    );
  }
  
  export default SkeletonCard;
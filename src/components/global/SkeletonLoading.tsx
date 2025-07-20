export default function SkeletonLoading() {
  return (
    <div className="mx-auto w-full shrink-0">
      <div className="animate-pulse">
        <div className="h-72 w-full rounded-t-xl bg-gray-300"></div>
        <div className="space-y-2 rounded-b-xl bg-gray-800 px-4 pt-4 pb-12">
          <div className="h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-3 w-2/13 rounded bg-gray-300"></div>
          <div className="h-4 rounded bg-gray-300"></div>
          <div className="h-4 rounded bg-gray-300"></div>
          <div className="h-4 w-5/6 rounded bg-gray-300"></div>
          <div className="h-3 w-1/5 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

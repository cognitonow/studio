export default function Loading() {
  // This loading UI will be displayed as a fallback while the page content is loading.
  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}

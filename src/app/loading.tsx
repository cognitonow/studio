export default function Loading() {
  // This loading UI will be displayed as a fallback while the page content is loading.
  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="text-2xl font-semibold text-muted-foreground">
        Loading...
      </div>
    </div>
  );
}

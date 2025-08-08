import Image from 'next/image';

const LeafIcon = () => (
  <svg
    className="inline-block w-16 h-16 text-primary"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.05 16.95C15.65 17.35 15.05 17.35 14.65 16.95L12 14.3L9.35 16.95C8.95 17.35 8.35 17.35 7.95 16.95C7.55 16.55 7.55 15.95 7.95 15.55L10.6 12.9L7.95 10.25C7.55 9.85 7.55 9.25 7.95 8.85C8.35 8.45 8.95 8.45 9.35 8.85L12 11.5L14.65 8.85C15.05 8.45 15.65 8.45 16.05 8.85C16.45 9.25 16.45 9.85 16.05 10.25L13.4 12.9L16.05 15.55C16.45 15.95 16.45 16.55 16.05 16.95Z"
      transform="translate(0, -1.5) scale(0.9)"
    />
  </svg>
);

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground leading-tight">
          <span className="text-primary font-normal">Rejuvenation</span>
          <LeafIcon /> of
          <br />
          the face and scalp
        </h1>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src="https://placehold.co/800x600.png"
              alt="Cosmetic products display"
              layout="fill"
              objectFit="cover"
              data-ai-hint="cosmetic products"
            />
          </div>
          <div className="max-w-md">
            <h2 className="text-2xl font-medium text-foreground mb-4">
              An advanced medical product specially designed for facial and
              scalp rejuvenation.
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              One of the key technologies included in RevivaDerm. It uses
              hybrid exosomes to replace old and damaged cells with young and
              healthy cells.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

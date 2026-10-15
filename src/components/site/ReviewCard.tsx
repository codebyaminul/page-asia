import type { Review } from "@/lib/reviews";

interface ReviewCardProps {
  review: Review;
  index?: number;
  featured?: boolean;
  className?: string;
}

function QuoteMarks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 28" fill="currentColor" className={className}>
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 4.1 2 7.7 5 10L0 28h11l3.5-9c.8-2.5 1.5-5.5 1.5-8.5C16 5.6 14.5 0 12.5 0zm21 0c-6.9 0-12.5 5.6-12.5 12.5 0 4.1 2 7.7 5 10L21 28h11l3.5-9c.8-2.5 1.5-5.5 1.5-8.5C37 5.6 35.5 0 33.5 0z" />
    </svg>
  );
}

// Card 1: Tail pointing to bottom-left corner
const pathTailLeft =
  "M 80,0 L 400,0 L 400,280 C 400,340 330,375 220,365 C 170,360 130,345 110,325 L 35,345 L 65,260 C 50,180 55,80 80,0 Z";

// Card 2: Tail pointing to bottom-right corner (horizontal mirror)
const pathTailRight =
  "M 0,0 L 320,0 C 345,80 350,180 335,260 L 365,345 L 290,325 C 270,345 230,360 180,365 C 70,375 0,340 0,280 L 0,0 Z";

export function ReviewCard({ review, index = 0, className = "" }: ReviewCardProps) {
  // Alternate theme based on index (Even = Navy, Odd = Amber)
  const isOdd = index % 2 !== 0;

  const theme = isOdd
    ? {
        cardBg: "bg-[#f59e0b]",
        bubblePath: pathTailRight,
        quotePosition: "left" as const,
        quoteColor: "text-[#f59e0b]",
        textColor: "text-[#9a3412]",
        authorColor: "text-[#9a3412]",
        // Compact padding so text stays strictly inside white speech bubble
        containerPadding: "pt-4 sm:pt-5 pb-9 sm:pb-11 pl-4 sm:pl-5 pr-8 sm:pr-10",
        textAlign: "text-left" as const,
        authorAlign: "text-left" as const,
      }
    : {
        cardBg: "bg-[#0c192c]",
        bubblePath: pathTailLeft,
        quotePosition: "right" as const,
        quoteColor: "text-[#0c192c]",
        textColor: "text-[#0c192c]",
        authorColor: "text-[#0c192c]",
        // Compact padding so text stays strictly inside white speech bubble
        containerPadding: "pt-4 sm:pt-5 pb-9 sm:pb-11 pl-8 sm:pl-10 pr-4 sm:pl-5",
        textAlign: "text-left" as const,
        authorAlign: "text-right" as const,
      };

  return (
    <article
      className={`group relative aspect-square w-[250px] sm:w-[270px] shrink-0 rounded-2xl ${theme.cardBg} overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl select-none ${className}`}
    >
      {/* Speech Bubble SVG Shape Background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <path d={theme.bubblePath} fill="#ffffff" />
      </svg>

      {/* Content strictly bounded inside the white speech bubble area */}
      <div
        className={`relative z-10 flex h-full flex-col justify-between ${theme.containerPadding}`}
      >
        {/* Top: Quotation Marks */}
        <div
          className={`flex items-center ${
            theme.quotePosition === "right" ? "justify-end" : "justify-start"
          }`}
        >
          <QuoteMarks className={`h-5 w-6 sm:h-6 sm:w-7 ${theme.quoteColor}`} />
        </div>

        {/* Center: The Review Comment Text */}
        <div className="my-auto py-1">
          <p
            className={`font-sans text-[11px] sm:text-xs leading-relaxed line-clamp-4 ${theme.textColor} font-medium`}
          >
            {review.comment}
          </p>
        </div>

        {/* Bottom: Reviewer's Name */}
        <div className={`mt-1 ${theme.authorAlign}`}>
          <span
            className={`font-display text-xs sm:text-sm font-bold tracking-tight truncate block ${theme.authorColor}`}
          >
            {review.name}
          </span>
        </div>
      </div>
    </article>
  );
}

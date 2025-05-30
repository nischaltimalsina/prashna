import React, { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const ratingVariants = {
  default: {
    star: "text-yellow-400 dark:text-yellow-500",
    emptyStar: "text-gray-300 dark:text-gray-600",
    hoverStar: "text-yellow-300 dark:text-yellow-400",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200 dark:text-red-800",
    hoverStar: "text-red-400",
  },
  small: {
    star: "text-yellow-400 dark:text-yellow-500",
    emptyStar: "text-gray-300 dark:text-gray-600",
    hoverStar: "text-yellow-300 dark:text-yellow-400",
  },
}

interface RatingInputProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  totalStars?: number
  size?: number
  fill?: boolean
  Icon?: React.ReactElement
  variant?: keyof typeof ratingVariants
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  showValue?: boolean
}

export const RatingInput = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  onRatingChange,
  readonly = false,
  showValue = false,
  className,
  ...props
}: RatingInputProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [currentRating, setCurrentRating] = useState(initialRating)

  // Sync with external rating changes
  React.useEffect(() => {
    setCurrentRating(initialRating)
  }, [initialRating])

  const handleMouseEnter = (starIndex: number) => {
    if (readonly) return
    setHoverRating(starIndex)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(null)
  }

  const handleClick = (starIndex: number) => {
    if (readonly) return

    // Allow clicking the same star to toggle off (set to 0)
    const newRating = currentRating === starIndex ? 0 : starIndex
    setCurrentRating(newRating)
    setHoverRating(null)
    onRatingChange?.(newRating)
  }

  const displayRating = hoverRating ?? currentRating
  const fullStars = Math.floor(displayRating)

  // Handle partial stars for display-only mode
  const partialStar =
    !readonly && displayRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={displayRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null

  return (
    <div
      className={cn("flex items-center gap-1", !readonly && "cursor-pointer", className)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="flex items-center">
        {/* Filled stars */}
        {[...Array(fullStars)].map((_, i) => {
          const starIndex = i + 1
          const isHovered = hoverRating !== null && starIndex <= hoverRating

          return React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              "transition-colors duration-150",
              fill ? "fill-current stroke-1" : "fill-transparent stroke-2",
              isHovered ? ratingVariants[variant].hoverStar : ratingVariants[variant].star,
              !readonly && "hover:scale-110 transition-transform"
            ),
            onClick: () => handleClick(starIndex),
            onMouseEnter: () => handleMouseEnter(starIndex),
            style: { cursor: readonly ? "default" : "pointer" },
          })
        })}

        {/* Partial star */}
        {partialStar}

        {/* Empty stars */}
        {[...Array(Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0)))].map((_, i) => {
          const starIndex = i + fullStars + 1
          const isHovered = hoverRating !== null && starIndex <= hoverRating

          return React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size,
            className: cn(
              "transition-colors duration-150",
              "stroke-2 fill-transparent",
              isHovered ? ratingVariants[variant].hoverStar : ratingVariants[variant].emptyStar,
              !readonly && "hover:scale-110 transition-transform"
            ),
            onClick: () => handleClick(starIndex),
            onMouseEnter: () => handleMouseEnter(starIndex),
            style: { cursor: readonly ? "default" : "pointer" },
          })
        })}
      </div>

      {/* Optional rating value display */}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

interface PartialStarProps {
  fillPercentage: number
  size: number
  className?: string
  Icon: React.ReactElement
}

const PartialStar = ({ fillPercentage, size, className, Icon }: PartialStarProps) => {
  return (
    <div className="relative inline-block">
      {/* Empty star background */}
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent stroke-2 text-gray-300", className),
      })}
      {/* Filled portion */}
      <div
        className="absolute top-0 left-0 overflow-hidden"
        style={{ width: `${fillPercentage * 100}%` }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current stroke-1", className),
        })}
      </div>
    </div>
  )
}

// Convenience component for display-only ratings
interface RatingDisplayProps {
  rating: number
  totalStars?: number
  size?: number
  showValue?: boolean
  className?: string
}

export const RatingDisplay = ({
  rating,
  totalStars = 5,
  size = 16,
  showValue = true,
  className,
}: RatingDisplayProps) => {
  return (
    <RatingInput
      rating={rating}
      totalStars={totalStars}
      size={size}
      readonly={true}
      showValue={showValue}
      variant="small"
      className={className}
    />
  )
}

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const GameCardSkeleton = () => {
	return (
		<Card className="relative overflow-hidden h-80">
			{/* Background skeleton */}
			<Skeleton className="absolute inset-0 w-full h-full" />

			{/* Content skeleton */}
			<div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
				{/* Badge skeleton */}
				<Skeleton className="h-5 w-16 mb-2" />

				{/* Title skeleton */}
				<Skeleton className="h-6 w-3/4" />

				{/* Genres skeleton */}
				<div className="flex flex-wrap gap-1">
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-24" />
				</div>

				{/* Platforms skeleton */}
				<div className="flex gap-2 mt-2">
					<Skeleton className="h-5 w-5 rounded-full" />
					<Skeleton className="h-5 w-5 rounded-full" />
					<Skeleton className="h-5 w-5 rounded-full" />
				</div>
			</div>
		</Card>
	);
};

export { GameCardSkeleton };

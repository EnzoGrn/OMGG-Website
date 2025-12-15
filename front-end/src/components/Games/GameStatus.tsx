import { Badge } from "@/components/ui/badge";
import { cn } from "../../lib/utils";

export const TIME_CONSIDERATE_AS_NEW = 30; // in days

export type GameStatus = 'coming' | 'new' | 'none';

export function getGameStatus(publicationDate?: string): GameStatus {
  if (!publicationDate)
    return 'coming'; // No release date announced
  const releaseDate = new Date(publicationDate);
  const today = new Date();

  if (releaseDate > today)
    return 'coming';
  const diffMs = today.getTime() - releaseDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= TIME_CONSIDERATE_AS_NEW)
    return 'new';
  return 'none';
}

export const GameStatusBadge = ({ status, className, children }: { status: GameStatus, className?: string, children: React.ReactNode }) => {
  if (status === 'none')
    return null;
  return (
    <Badge className={cn(status === 'coming' ? "bg-[#0DF7A1]" : "", className)}>
      {children}
    </Badge>
  );
}

import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  name?: string;
  description?: string;
  Badges?: string[];
  onBadgeClick?: (index: number) => void;
}
export default function Header({
  name,
  description,
  Badges,
  onBadgeClick,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
          {description}
        </p>
        <div className="flex gap-1 mt-2 flex-wrap">
          {Badges &&
            Badges.map((badge, index) => (
              <Badge
                key={badge}
                variant="outline"
                className={
                  onBadgeClick ? "cursor-pointer hover:bg-primary/10" : ""
                }
                onClick={() => onBadgeClick && onBadgeClick(index)}
              >
                {badge}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}

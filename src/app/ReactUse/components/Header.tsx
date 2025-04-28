import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  name?: string;
  description?: string;
  Badges?: string[];
}

export default function Header({ name, description, Badges }: HeaderProps) {
  const handleBadgeClickInternal = (badgeTitle: string) => {
    const element = document.getElementById(badgeTitle);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`[Header] Element with id '${badgeTitle}' '`);
    }
  };

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
          {description}
        </p>
        <div className="flex gap-1 mt-2 flex-wrap">
          {Badges &&
            Badges.map((badge) => (
              <Badge
                key={badge}
                variant="outline"
                className={"cursor-pointer hover:bg-primary/10"}
                onClick={() => handleBadgeClickInternal(badge)}
              >
                {badge}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}

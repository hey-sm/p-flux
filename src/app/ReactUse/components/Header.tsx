"use client";

import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  name?: string;
  description?: string;
  Badges?: string[];
}
const colors = [
  "bg-blue-100",
  "bg-indigo-100",
  "bg-violet-100",
  "bg-orange-100",
  "bg-green-100",
  "bg-sky-100",
  "bg-slate-100",
  "bg-purple-100",
  "bg-pink-100",
];

export default function Header({ name, description, Badges }: HeaderProps) {
  // 为每个Badge预先分配一个固定的颜色
  const badgeColors = useMemo(() => {
    if (!Badges) return {};
    return Object.fromEntries(
      Badges.map((badge, index) => [badge, colors[index % colors.length]])
    );
  }, [Badges]);

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
                className={cn(
                  "cursor-pointer hover:bg-primary/10",
                  badgeColors[badge]
                )}
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

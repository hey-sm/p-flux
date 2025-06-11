/** @format */
"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const icons = [
  "icon-[akar-icons--nextjs-fill]",
  "icon-[simple-icons--react]",
  "icon-[simple-icons--tailwindcss]",
  "icon-[teenyicons--framer-outline]",
  "icon-[simple-icons--shadcnui]",
  "icon-[simple-icons--typescript]",
  "icon-[fa6-brands--sass]",
  "icon-[teenyicons--eslint-outline]",
  "icon-[simple-icons--postcss]",
  "icon-[simple-icons--nextra]",
  "icon-[line-md--iconify1]",
];

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full  mt-10 flex-col items-center justify-center overflow-hidden">
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {icons.map((icon) => (
          <StackItem key={icon} className={icon} />
        ))}
      </Marquee>
    </div>
  );
}

const StackItem = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "mx-6 size-[50px]",
        "text-gray-400 dark:text-neutral-100",
        "transition-all duration-300 transform opacity-75",
        "hover:scale-125 hover:opacity-100",
        className
      )}
    ></div>
  );
};

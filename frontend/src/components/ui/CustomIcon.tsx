import { COLOR_MAP, type ColorTheme } from "@/constants/colorConstants";
import type { LucideIcon } from "lucide-react";

interface CustomIconProps {
  Icon: LucideIcon;
  colorTheme: ColorTheme;
}

function CustomIcon({ Icon, colorTheme }: CustomIconProps) {
  const color = COLOR_MAP[colorTheme];
  return (
    <div
      style={{ backgroundColor: color.bg }}
      className="bg-accent p-3 rounded-full"
    >
      <Icon style={{ color: color.icon }} />
    </div>
  );
}

export default CustomIcon;

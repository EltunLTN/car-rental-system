import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { COLOR_MAP, type ColorTheme } from "@/constants/colorConstants";
import type { SetStateAction } from "react";

interface ToggleButtonsProps {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  values: string[];
}

// display different colors for different categories
const indexToColor: ColorTheme[] = ["blue", "green", "red"];

function ToggleButtons({ value, setValue, values }: ToggleButtonsProps) {
  return (
    <ToggleGroup
      value={value}
      type="single"
      variant="outline"
      spacing={2}
      size="sm"
      className="border p-1 bg-sidebar!"
      data-testid="toggle-btns"
    >
      {values.map((itemValue, index) => {
        // ensure if the index is out of bounds pick colors in loop
        const cyclicIndex = index % indexToColor.length;
        const color = indexToColor[cyclicIndex];
        return (
          <ToggleGroupItem
            key={`toggle-group-${itemValue}`}
            value={itemValue}
            aria-label={`Toggle ${itemValue}`}
            style={
              itemValue === value
                ? {
                    backgroundColor: COLOR_MAP[color].bg,
                    color: COLOR_MAP[color].icon,
                  }
                : {}
            }
            className="capitalize border-0 shadow-0 bg-sidebar cursor-pointer"
            onClick={() => setValue(itemValue)}
          >
            {itemValue}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

export default ToggleButtons;

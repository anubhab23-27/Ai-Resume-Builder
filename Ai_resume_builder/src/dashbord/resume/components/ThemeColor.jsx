import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    "#1C1C1C", // Deep Charcoal
    "#1F2937", // Dark Slate
    "#0B3C5D", // Deep Navy Blue
    "#12343B", // Dark Teal
    "#2C3E50", // Midnight Blue
    "#3A3F58", // Indigo Slate
    "#4A235A", // Dark Purple
    "#4B3621", // Dark Brown
    "#5B2C2C", // Deep Burgundy
    "#145A32", // Forest Green
    "#1B4F72", // Steel Blue
    "#2E4053", // Blue Gray
    "#566573", // Slate Gray
    "#6C3483", // Muted Violet
    "#7B241C", // Wine Red
    "#186A3B", // Emerald Dark
    "#21618C", // Professional Blue
    "#2874A6", // Corporate Blue
    "#117864", // Rich Teal
    "#7D6608", // Muted Gold
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { resumeid } = useParams();
  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.UpdateResumeDetail(resumeid, data).then((resp) => {
      console.log(resp);
      toast("Theme Color Updated");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor == item && "border border-black"}
             `}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;

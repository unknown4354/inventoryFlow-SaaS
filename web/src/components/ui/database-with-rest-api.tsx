"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Warehouse, Activity, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  // Theme-aware colors
  const pathColor = isDark ? "rgb(107, 114, 128)" : "rgb(156, 163, 175)";
  const bgColor = isDark ? "#0a0a0a" : "#374151";
  const textColor = isDark ? "rgb(229, 231, 235)" : "white";
  const boxBg = isDark ? "rgba(10, 10, 10, 0.95)" : "rgba(255, 255, 255, 0.95)";
  const circleBg = isDark ? "#0a0a0a" : "#374151";
  const badgeBg = isDark ? "#0a0a0a" : "#374151";
  const shadowColor = isDark ? "rgba(249, 115, 22, 0.15)" : "rgba(249, 115, 22, 0.1)";
  const borderColor = isDark ? "rgba(38, 38, 38, 0.5)" : "rgba(209, 213, 219, 0.5)";
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths  */}
      <svg
        className="h-full sm:w-full"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        style={{ color: pathColor }}
      >
        <g
          stroke={pathColor}
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Animated Lights */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-red-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-red-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-red-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-red-grad)"
          />
        </g>
        {/* Buttons */}
        <g stroke={pathColor} fill="none" strokeWidth="0.4">
          {/* First Button */}
          <g>
            <rect
              fill={bgColor}
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <PackageIcon x="18" y="7.5" color={textColor}></PackageIcon>
            <text
              x="28"
              y="12"
              fill={textColor}
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.first || "Stock"}
            </text>
          </g>
          {/* Second Button */}
          <g>
            <rect
              fill={bgColor}
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <PackageIcon x="64" y="7.5" color={textColor}></PackageIcon>
            <text
              x="74"
              y="12"
              fill={textColor}
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.second || "Add"}
            </text>
          </g>
          {/* Third Button */}
          <g>
            <rect
              fill={bgColor}
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <PackageIcon x="112" y="7.5" color={textColor}></PackageIcon>
            <text
              x="122"
              y="12"
              fill={textColor}
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.third || "Update"}
            </text>
          </g>
          {/* Fourth Button */}
          <g>
            <rect
              fill={bgColor}
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
            ></rect>
            <PackageIcon x="154" y="7.5" color={textColor}></PackageIcon>
            <text
              x="165"
              y="12"
              fill={textColor}
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "Remove"}
            </text>
          </g>
        </g>
        <defs>
          {/* 1 - Stock Level */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - Add Items */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - Update Status */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - Remove Stock */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Light Gradient */}
          <radialGradient id="db-red-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#9333ea"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div
          className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg"
          style={{ backgroundColor: shadowColor }}
        />
        {/* box title */}
        <div
          className="absolute -top-3 z-20 flex items-center justify-center rounded-lg px-2 py-1 sm:-top-4 sm:py-1.5 max-w-[85%] sm:max-w-none"
          style={{
            backgroundColor: badgeBg,
            border: `1px solid ${borderColor}`,
            color: textColor
          }}
        >
          <Sparkles className="size-3 flex-shrink-0" />
          <span className="ml-2 text-[10px] sm:text-xs truncate">
            {title ? title : "Real-time inventory sync"}
          </span>
        </div>
        {/* box outter circle */}
        <div
          className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t font-semibold text-xs"
          style={{
            backgroundColor: circleBg,
            color: textColor,
            borderColor: borderColor
          }}
        >
          {circleText ? circleText : "Inventory"}
        </div>
        {/* box content */}
        <div
          className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg shadow-md"
          style={{
            backgroundColor: boxBg,
            border: `1px solid ${borderColor}`
          }}
        >
          {/* Badges */}
          <div
            className="absolute bottom-8 left-12 z-10 h-7 rounded-full px-3 text-xs flex items-center gap-2"
            style={{
              backgroundColor: badgeBg,
              border: `1px solid ${borderColor}`,
              color: textColor
            }}
          >
            <Warehouse className="size-4" />
            <span>{buttonTexts?.first || "InventoryFlow"}</span>
          </div>
          <div
            className="absolute right-16 z-10 hidden h-7 rounded-full px-3 text-xs sm:flex items-center gap-2"
            style={{
              backgroundColor: badgeBg,
              border: `1px solid ${borderColor}`,
              color: textColor
            }}
          >
            <Activity className="size-4" />
            <span>{buttonTexts?.second || "Live"}</span>
          </div>
          {/* Circles */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t"
            style={{
              backgroundColor: isDark ? 'rgba(249, 115, 22, 0.03)' : 'rgba(249, 115, 22, 0.05)',
              borderColor: borderColor
            }}
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t"
            style={{
              backgroundColor: isDark ? 'rgba(249, 115, 22, 0.03)' : 'rgba(249, 115, 22, 0.05)',
              borderColor: borderColor
            }}
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t"
            style={{
              backgroundColor: isDark ? 'rgba(249, 115, 22, 0.03)' : 'rgba(249, 115, 22, 0.05)',
              borderColor: borderColor
            }}
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t"
            style={{
              backgroundColor: isDark ? 'rgba(249, 115, 22, 0.03)' : 'rgba(249, 115, 22, 0.05)',
              borderColor: borderColor
            }}
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const PackageIcon = ({ x = "0", y = "0", color = "white" }: { x: string; y: string; color?: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
};

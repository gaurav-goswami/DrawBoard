import React, { useRef } from "react";

interface ITooltip {
  children: React.ReactNode;
  title ?: string;
  style ?: string
}

const Tooltip: React.FC<ITooltip> = ({ children, title, style }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={containerRef}
        className={`group relative ${style} inline-flex`}
        onMouseEnter={({ clientX }) => {
          if (!tooltipRef.current || !containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          tooltipRef.current.style.left = clientX - rect.left + "px";
        }}
      >
        {children}
        {title && (
          <span
            ref={tooltipRef}
            className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all text-white bg-[#272d33] px-2 py-1 rounded-md absolute top-full mt-2 whitespace-nowrap"
          >
            {title}
          </span>
        )}
      </div>
    </>
  );
};

export default Tooltip;

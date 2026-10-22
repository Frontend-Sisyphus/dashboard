"use client";

import { useId } from "react";

type HeimdallLogoProps = {
  className?: string;
  title?: string;
};

/**
 * Heimdall mark: all-seeing aperture (watchman) over a faint Bifröst arc.
 * Ops / stats face of the pair — colder HUD frame than the bridge mark.
 */
export function HeimdallLogo({
  className = "",
  title = "Heimdall",
}: HeimdallLogoProps) {
  const uid = useId().replace(/:/g, "");
  const bifrost = `heimdall-bifrost-${uid}`;
  const iris = `heimdall-iris-${uid}`;
  const glow = `heimdall-glow-${uid}`;

  return (
    <svg
      className={`heimdall-logo ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={bifrost} x1="8" y1="14" x2="56" y2="14">
          <stop offset="0%" stopColor="#17786c" />
          <stop offset="45%" stopColor="#00cbd9" />
          <stop offset="100%" stopColor="#38aaff" />
        </linearGradient>
        <radialGradient id={iris} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7af0f6" />
          <stop offset="55%" stopColor="#00cbd9" />
          <stop offset="100%" stopColor="#17786c" />
        </radialGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="2"
        className="logo-bg"
        fill="var(--heimdall-logo-bg, #0b1114)"
        stroke={`url(#${bifrost})`}
        strokeWidth="1.5"
      />
      <path
        d="M10 18V12h6M54 18V12h-6M10 46v6h6M54 46v6h-6"
        stroke="#00cbd9"
        strokeWidth="1.4"
        strokeLinecap="square"
        opacity="0.85"
      />

      <path
        d="M14 28c6.5-10 29.5-10 36 0"
        stroke={`url(#${bifrost})`}
        strokeWidth="2"
        strokeLinecap="round"
        filter={`url(#${glow})`}
        opacity="0.75"
      />

      <ellipse
        cx="32"
        cy="36"
        rx="16"
        ry="9"
        stroke="#00cbd9"
        strokeWidth="1.6"
        opacity="0.9"
      />
      <ellipse cx="32" cy="36" rx="7.5" ry="7.5" fill={`url(#${iris})`} />
      <circle cx="32" cy="36" r="2.6" fill="#042428" />
      <circle cx="34" cy="34.2" r="1" fill="#7af0f6" opacity="0.9" />

      <path
        d="M22 36h4M38 36h4"
        stroke="#7af0f6"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

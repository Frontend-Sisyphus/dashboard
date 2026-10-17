"use client";

import { useId } from "react";

type BifrostLogoProps = {
  className?: string;
  title?: string;
};

/**
 * Bifröst mark: prismatic bridge arcs between two pillars —
 * the path students cross, watched by Heimdall.
 */
export function BifrostLogo({
  className = "",
  title = "Bifröst",
}: BifrostLogoProps) {
  const uid = useId().replace(/:/g, "");
  const prism = `bifrost-prism-${uid}`;
  const glow = `bifrost-glow-${uid}`;
  const deck = `bifrost-deck-${uid}`;

  return (
    <svg
      className={`bifrost-logo ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={prism} x1="10" y1="40" x2="54" y2="18">
          <stop offset="0%" stopColor="#17786c" />
          <stop offset="35%" stopColor="#00cbd9" />
          <stop offset="70%" stopColor="#38aaff" />
          <stop offset="100%" stopColor="#7af0f6" />
        </linearGradient>
        <linearGradient id={deck} x1="12" y1="48" x2="52" y2="48">
          <stop offset="0%" stopColor="#17786c" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#00cbd9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#38aaff" stopOpacity="0.35" />
        </linearGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft frame — open, not a sealed HUD */}
      <rect
        x="5"
        y="5"
        width="54"
        height="54"
        fill="#0b1114"
        stroke={`url(#${prism})`}
        strokeWidth="1.4"
        opacity="0.95"
      />

      {/* Twin pillars of the bridge */}
      <path
        d="M16 48V28M48 48V28"
        stroke={`url(#${prism})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M13 48h6M45 48h6"
        stroke="#00cbd9"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Prismatic arcs */}
      <path
        d="M16 30c5.5-14 26.5-14 32 0"
        stroke={`url(#${prism})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        filter={`url(#${glow})`}
      />
      <path
        d="M18 33c4.5-10 23.5-10 28 0"
        stroke="#38aaff"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M20 36c3.8-7 20.2-7 24 0"
        stroke="#7af0f6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Path / deck toward the viewer */}
      <path
        d="M22 40c3.5 4 16.5 4 20 0"
        stroke={`url(#${deck})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="32" cy="42" r="1.6" fill="#7af0f6" opacity="0.85" />
    </svg>
  );
}

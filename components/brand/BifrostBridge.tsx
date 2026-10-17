"use client";

import { useId } from "react";

type BifrostBridgeProps = {
  className?: string;
};

/**
 * Full-bleed Bifröst for boot: prismatic arcs span between two realms,
 * light walks the bridge — warmer and more open than Heimdall's eye.
 */
export function BifrostBridge({ className = "" }: BifrostBridgeProps) {
  const uid = useId().replace(/:/g, "");
  const prism = `bb-prism-${uid}`;
  const aurora = `bb-aurora-${uid}`;
  const glow = `bb-glow-${uid}`;

  return (
    <svg
      className={`bifrost-bridge ${className}`}
      viewBox="0 0 800 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={prism} x1="80" y1="280" x2="720" y2="120">
          <stop offset="0%" stopColor="#17786c" />
          <stop offset="28%" stopColor="#00cbd9" />
          <stop offset="58%" stopColor="#38aaff" />
          <stop offset="82%" stopColor="#7af0f6" />
          <stop offset="100%" stopColor="#c4f7ff" />
        </linearGradient>
        <linearGradient id={aurora} x1="400" y1="40" x2="400" y2="320">
          <stop offset="0%" stopColor="#38aaff" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#00cbd9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#17786c" stopOpacity="0" />
        </linearGradient>
        <filter id={glow} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft aurora wash */}
      <ellipse
        className="bifrost-bridge__aurora"
        cx="400"
        cy="160"
        rx="280"
        ry="120"
        fill={`url(#${aurora})`}
      />

      {/* Left pillar — Midgard / campus */}
      <g className="bifrost-bridge__pillar bifrost-bridge__pillar--left">
        <path
          d="M110 340V168"
          stroke={`url(#${prism})`}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M88 340h44"
          stroke="#00cbd9"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M100 168h20"
          stroke="#7af0f6"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>

      {/* Right pillar — Asgard / knowledge */}
      <g className="bifrost-bridge__pillar bifrost-bridge__pillar--right">
        <path
          d="M690 340V168"
          stroke={`url(#${prism})`}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M668 340h44"
          stroke="#38aaff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M680 168h20"
          stroke="#7af0f6"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>

      {/* Prismatic deck arcs — drawn via stroke-dashoffset */}
      <g filter={`url(#${glow})`}>
        <path
          className="bifrost-bridge__arc bifrost-bridge__arc--1"
          d="M110 190 C 250 40, 550 40, 690 190"
          stroke={`url(#${prism})`}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className="bifrost-bridge__arc bifrost-bridge__arc--2"
          d="M118 210 C 255 75, 545 75, 682 210"
          stroke="#38aaff"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        <path
          className="bifrost-bridge__arc bifrost-bridge__arc--3"
          d="M128 228 C 260 105, 540 105, 672 228"
          stroke="#7af0f6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          className="bifrost-bridge__arc bifrost-bridge__arc--4"
          d="M140 248 C 268 140, 532 140, 660 248"
          stroke="#17786c"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </g>

      {/* Traveler light along the main arc */}
      <circle
        className="bifrost-bridge__traveler"
        r="7"
        fill="#c4f7ff"
        filter={`url(#${glow})`}
      >
        <animateMotion
          dur="3.2s"
          repeatCount="indefinite"
          path="M110 190 C 250 40, 550 40, 690 190"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>

      {/* Ground path toward viewer */}
      <path
        className="bifrost-bridge__path"
        d="M220 300 C 320 340, 480 340, 580 300"
        stroke={`url(#${prism})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

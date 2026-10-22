"use client";

import { useId } from "react";

type WatchingEyeProps = {
  className?: string;
};

/**
 * Oversized watchman eye for boot background —
 * Heimdall aperture with a quiet Orwell "telescreen" read.
 */
export function WatchingEye({ className = "" }: WatchingEyeProps) {
  const uid = useId().replace(/:/g, "");
  const iris = `watch-iris-${uid}`;
  const glow = `watch-glow-${uid}`;
  const veil = `watch-veil-${uid}`;

  return (
    <svg
      className={`watching-eye ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id={iris} cx="48%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#9af7fb" />
          <stop offset="35%" stopColor="#00cbd9" />
          <stop offset="72%" stopColor="#17786c" />
          <stop offset="100%" stopColor="#0a1618" />
        </radialGradient>
        <radialGradient id={veil} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00cbd9" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#00cbd9" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Telescreen rings */}
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="#00cbd9"
        strokeWidth="0.6"
        opacity="0.18"
      />
      <circle
        cx="100"
        cy="100"
        r="78"
        stroke="#38aaff"
        strokeWidth="0.5"
        opacity="0.14"
        strokeDasharray="2 6"
      />
      <circle
        cx="100"
        cy="100"
        r="64"
        stroke="#00cbd9"
        strokeWidth="0.7"
        opacity="0.22"
      />

      {/* Lid / almond */}
      <ellipse
        cx="100"
        cy="100"
        rx="78"
        ry="42"
        fill={`url(#${veil})`}
        stroke="#00cbd9"
        strokeWidth="1.8"
        opacity="0.85"
        filter={`url(#${glow})`}
      />
      <ellipse
        cx="100"
        cy="100"
        rx="70"
        ry="36"
        stroke="#7af0f6"
        strokeWidth="0.6"
        opacity="0.35"
      />

      {/* Iris + pupil */}
      <g className="watching-eye__pupil">
        <circle cx="100" cy="100" r="34" fill={`url(#${iris})`} />
        <circle cx="100" cy="100" r="14" fill="#041012" />
        <circle cx="108" cy="92" r="5" fill="#7af0f6" opacity="0.85" />
        <circle cx="94" cy="106" r="2.2" fill="#7af0f6" opacity="0.45" />
      </g>

      {/* Crosshair ticks — Ministry HUD */}
      <path
        d="M100 58v10M100 132v10M58 100h10M132 100h10"
        stroke="#7af0f6"
        strokeWidth="1.2"
        strokeLinecap="square"
        opacity="0.55"
      />
      <path
        d="M72 72l6 6M128 72l-6 6M72 128l6-6M128 128l-6-6"
        stroke="#00cbd9"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}

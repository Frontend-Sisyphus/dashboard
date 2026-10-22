"use client";

import { useId } from "react";

type GjallarhornLogoProps = {
  className?: string;
  title?: string;
};

/**
 * Gjallarhorn mark: acoustic radar & telemetry pulses radiating across the realms.
 * The horn that signals health, status, and alerts for all ITC projects.
 */
export function GjallarhornLogo({
  className = "",
  title = "Gjallarhorn",
}: GjallarhornLogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradient = `gjallarhorn-grad-${uid}`;
  const pulse = `gjallarhorn-pulse-${uid}`;
  const glow = `gjallarhorn-glow-${uid}`;

  return (
    <svg
      className={`gjallarhorn-logo ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradient} x1="6" y1="6" x2="58" y2="58">
          <stop offset="0%" stopColor="#00cbd9" />
          <stop offset="50%" stopColor="#17786c" />
          <stop offset="100%" stopColor="#38aaff" />
        </linearGradient>
        <radialGradient id={pulse} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7af0f6" />
          <stop offset="40%" stopColor="#00cbd9" />
          <stop offset="100%" stopColor="#042428" />
        </radialGradient>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer cyber HUD frame */}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="2"
        className="logo-bg"
        fill="var(--heimdall-logo-bg, #080e12)"
        stroke={`url(#${gradient})`}
        strokeWidth="1.5"
      />

      {/* HUD corner notches */}
      <path
        d="M8 16V8h8M48 8h8v8M8 48v8h8M48 56h8v-8"
        stroke="#00cbd9"
        strokeWidth="1.5"
        strokeLinecap="square"
        opacity="0.85"
      />

      {/* Acoustic waves / Horn expansion telemetry arcs */}
      <path
        d="M20 44C20 31.8497 29.8497 22 42 22"
        stroke="#17786c"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        opacity="0.6"
      />
      <path
        d="M16 48C16 30.3269 30.3269 16 48 16"
        stroke="#00cbd9"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
        filter={`url(#${glow})`}
      />
      <path
        d="M24 50C24 37.8497 33.8497 28 46 28"
        stroke="#38aaff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Horn core horn mouth & pulse beacon */}
      <path
        d="M18 46L24 40L30 46L24 52Z"
        fill={`url(#${pulse})`}
        stroke="#7af0f6"
        strokeWidth="1.2"
      />
      <circle cx="24" cy="46" r="2.2" fill="#042428" />
      <circle cx="24" cy="46" r="1.1" fill="#7af0f6" />

      {/* Radar telemetry scan vectors */}
      <circle
        cx="46"
        cy="18"
        r="2"
        fill="#00cbd9"
        filter={`url(#${glow})`}
      />
      <circle cx="38" cy="28" r="1.6" fill="#7af0f6" />
      <circle cx="48" cy="38" r="1.8" fill="#38aaff" />

      {/* Pulse ray */}
      <path
        d="M28 42L46 20"
        stroke="#7af0f6"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />
    </svg>
  );
}

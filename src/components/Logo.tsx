import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
  variant?: 'gold' | 'blue' | 'white';
}

export default function Logo({ className = '', height = 56, variant = 'gold' }: LogoProps) {
  const color = variant === 'gold' ? '#C9A84C' : variant === 'white' ? '#ffffff' : '#1B3FAB';
  const textColor = variant === 'gold' ? '#C9A84C' : variant === 'white' ? '#ffffff' : '#1B3FAB';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 190"
      height={height}
      className={className}
      aria-label="Albina Alareeq Logo"
    >
      {/* ── Building column (left) ── */}
      {/* Outer rectangle */}
      <rect x="25" y="52" width="68" height="98" fill={color} />
      {/* Inner door void (white) */}
      <rect x="43" y="88" width="30" height="62" fill="transparent" stroke="none" />
      <rect x="43" y="88" width="30" height="62" fill="#1a1a1a" opacity="0" />
      {/* Use clip-path approach: draw building as path with hole */}
      <path
        d="M25,52 L93,52 L93,150 L73,150 L73,88 L43,88 L43,150 L25,150 Z"
        fill={color}
      />

      {/* ── Chevron / Roof peak 1 (tallest, left) ── */}
      <polygon
        points="82,52  168,8  255,65  255,150  82,150"
        fill={color}
      />

      {/* ── Chevron / Roof peak 2 (middle) ── */}
      <polygon
        points="198,65  295,15  392,72  392,150  198,150"
        fill={color}
      />

      {/* ── Chevron / Roof peak 3 (right, shorter) ── */}
      <polygon
        points="335,72  422,30  512,80  512,150  335,150"
        fill={color}
      />

      {/* ── Baseline ── */}
      <rect x="25" y="150" width="512" height="5" fill={color} rx="1" />

      {/* ── Arabic text ── */}
      <text
        x="310"
        y="140"
        textAnchor="middle"
        fontFamily="'Noto Kufi Arabic', 'Arial', sans-serif"
        fontSize="13"
        fill={textColor}
        direction="rtl"
      >
        البناء العريق للمقاولات والصيانة العامة ـ ذ.م.م ـ ش.ش.و
      </text>

      {/* ── English text ── */}
      <text
        x="280"
        y="182"
        textAnchor="middle"
        fontFamily="'Arial', sans-serif"
        fontSize="12.5"
        fontWeight="bold"
        fill={textColor}
        letterSpacing="0.5"
      >
        ALBINA ALAREEQ CONT. &amp; GENERAL MAINT. - L.L.C -S.P.C
      </text>
    </svg>
  );
}

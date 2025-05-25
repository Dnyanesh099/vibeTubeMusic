// src/VibeTubeLogo.js
import React from "react";

export default function VibeTubeLogo({ width = 160, height = 44 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 180 48"
      role="img"
      aria-label="VibeTube logo"
    >
      <style>
        {`
          .text {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: bold;
            font-size: 32px;
            fill: #FF0000;
            user-select: none;
          }
          .play-icon {
            fill: #FF0000;
          }
        `}
      </style>
      <polygon className="play-icon" points="10,6 10,42 38,24" />
      <text x="50" y="34" className="text">VibeTube</text>
    </svg>
  );
}

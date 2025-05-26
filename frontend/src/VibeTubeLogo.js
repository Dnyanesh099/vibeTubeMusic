// src/VibeTubeLogo.js
export default function VibeTubeLogo({ width = 180, height = 48 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 180 48"
      role="img"
      aria-label="VibeTube logo"
    >
      <polygon points="10,8 10,40 36,24" fill="#FF0000" />
      <text
        x="50"
        y="32"
        fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
        fontWeight="bold"
        fontSize="28"
        fill="#FF0000"
      >
        VibeTube
      </text>
    </svg>
  );
}

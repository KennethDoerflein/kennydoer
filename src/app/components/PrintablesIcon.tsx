// src/app/components/PrintablesIcon.tsx

export default function PrintablesIcon({ width = 28, height = 28 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-15 0 218.364 297.474"
      width={width}
      height={height}>
      <g>
        <path
          fill="#fa6934"
          d="M 100 0 C 92.596 -0.274 93.107 114.745 100 115 L 200 57 L 100 0 Z"
        />
        <path fill="#fa6934" d="M 0 172.474 L 0 287.474 L 100 229.474 L 0 172.474 Z" />
        <path
          fill="#fa6934"
          d="M 0 0 C -6.355 -0.771 -7.465 113.966 0 115 L 100 57 L 0 0 Z"
          transform="matrix(-1, 0, 0, -1, 100, 115)"
        />
        <path
          fill="#fa6934"
          d="M 100 57 L 100 172 C 104.237 182.064 204.237 124.064 200 114 C 200.363 95.923 106.16 50.129 100 57 Z"
          transform="matrix(-1, 0, 0, -1, 300, 229)"
        />
        <path
          fill="#fa6934"
          d="M 100 115 L 100 230 L 200 172 C 203.364 169.57 106.006 110.662 100 115 Z"
        />
      </g>
    </svg>
  );
}

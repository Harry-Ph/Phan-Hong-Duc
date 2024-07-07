import { SVGProps } from "react";

export const DoubleArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17 3l0 18"></path>
    <path d="M10 18l-3 3l-3 -3"></path>
    <path d="M7 21l0 -18"></path>
    <path d="M20 6l-3 -3l-3 3"></path>
  </svg>
);

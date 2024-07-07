import { SVGProps } from "react";
export const LeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5 12l14 0"></path>
    <path d="M5 12l6 6"></path>
    <path d="M5 12l6 -6"></path>
  </svg>
);

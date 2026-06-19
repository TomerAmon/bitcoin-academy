"use client";

export default function BitcoinLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M22.4 13.6c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.6-.4-.7 2.7-1.3-.3.7-2.7-1.6-.4-.7 2.7-2.6-.7-.4 1.7s1.2.3 1.2.3c.7.2.8.7.8.7l-2 7.9s-.2.4-.7.3c0 0-1.2-.3-1.2-.3l-.8 1.8 2.5.6-.7 2.7 1.6.4.7-2.7 1.3.3-.7 2.7 1.6.4.7-2.8c2.8.5 4.9.3 5.8-2.2.7-2-.03-3.1-1.5-3.8.9-.2 1.7-.8 1.9-2.1zm-3.3 4.7c-.5 2-3.9.9-5 .6l.9-3.5c1.1.3 4.6.8 4.1 2.9zm.5-4.7c-.5 1.8-3.3.9-4.2.7l.8-3.2c.9.2 3.9.6 3.4 2.5z"
        fill="white"
      />
    </svg>
  );
}

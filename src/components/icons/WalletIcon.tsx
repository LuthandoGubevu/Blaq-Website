import type { IconProps } from './IconProps';
import { DEFAULT_ICON_SIZE } from './IconProps';

export function WalletIcon({ size = DEFAULT_ICON_SIZE, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={rest['aria-hidden'] ?? true}
    >
      <rect x="3" y="6" width="18" height="13" rx="0" />
      <path d="M3 10h18" />
      <path d="M15 14.5h3" />
    </svg>
  );
}

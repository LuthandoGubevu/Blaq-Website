import type { IconProps } from './IconProps';
import { DEFAULT_ICON_SIZE } from './IconProps';

export function UsersIcon({ size = DEFAULT_ICON_SIZE, className, ...rest }: IconProps) {
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
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.6 2.7-5.8 6-5.8s6 2.2 6 5.8" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.4c2.6.3 4.5 2.2 4.5 5.6" />
    </svg>
  );
}

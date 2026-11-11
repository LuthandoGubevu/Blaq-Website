import type { IconProps } from './IconProps';
import { DEFAULT_ICON_SIZE } from './IconProps';

export function CheckCircleIcon({ size = DEFAULT_ICON_SIZE, className, ...rest }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12.5 10.8 15 16 9" />
    </svg>
  );
}

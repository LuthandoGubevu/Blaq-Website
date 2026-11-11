import type { IconProps } from './IconProps';
import { DEFAULT_ICON_SIZE } from './IconProps';

export function ArrowLeftIcon({ size = DEFAULT_ICON_SIZE, className, ...rest }: IconProps) {
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
      <polyline points="14 6 8 12 14 18" />
    </svg>
  );
}

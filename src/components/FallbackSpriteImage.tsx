import type { CSSProperties } from 'react';
import fallbackSprite from '@/assets/fallback_img_sprite-removebg.png';
import { cn } from '@/lib/utils';

type FallbackSpriteImageProps = {
  name: string;
  tags?: string[];
  className?: string;
};

/**
 * Returns the CSS background-position-x percentage for the fallback
 * sprite based on the snack's tag. The sprite has 3 frames:
 *   0% = fried snack, 50% = donut (sweet), 100% = snack box (default)
 */
export function getFallbackSpritePosition(
  tag?: string
): string {
  if (tag === 'fried' || tag === 'salted') return '0%';
  if (tag === 'sweet') return '50%';
  return '100%';
}

export default function FallbackSpriteImage({
  name,
  tags = [],
  className,
}: FallbackSpriteImageProps) {
  const style: CSSProperties = {
    backgroundImage: `url(${fallbackSprite.src})`,
    backgroundSize: '300% auto',
    backgroundPosition: `${getFallbackSpritePosition(tags[0])} center`,
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      role="img"
      aria-label={name}
      className={cn('h-[100px] w-[100px] rounded-xl', className)}
      style={style}
    />
  );
}

export interface Hsl {
  h: number; // 0..360
  s: number; // 0..1
  l: number; // 0..1
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function hexToHsl(hex: string): Hsl {
  let value = hex.replace('#', '').trim();
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s, l };
}

export function hslToHex({ h, s, l }: Hsl): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  const [r, g, b] = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x]
  ][Math.min(5, Math.floor(h / 60))];

  const toHex = (channel: number) =>
    Math.round((channel + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Turns a card surface color into a luminous "glow" tone for the hero ambient
 * light. Lightness and saturation are clamped into a pleasant range so the glow
 * always reads as vivid light over the dark background — even when the source
 * surface is near-black. When the base is essentially grayscale, the hue is
 * borrowed from `hueFallback` (the project accent) so the glow still has color.
 */
export function toGlow(base: string, hueFallback?: string): string {
  const source = hexToHsl(base);
  const hue = source.s < 0.18 && hueFallback ? hexToHsl(hueFallback).h : source.h;

  return hslToHex({
    h: hue,
    s: clamp(Math.max(source.s, 0.35), 0, 0.8),
    l: clamp(source.l, 0.46, 0.62)
  });
}

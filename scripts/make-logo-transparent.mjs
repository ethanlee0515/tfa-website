#!/usr/bin/env node
/** Regenerate public/tfa-logo-transparent.png from public/tfa-logo.png */
import fs from "fs";
import sharp from "sharp";

function backgroundness(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  if (min >= 218 && max >= 235 && sat <= 28) {
    return Math.min(1, (min - 200) / 55 + (255 - max) / 40);
  }
  if (min >= 200 && max >= 240 && sat <= 20) {
    return Math.max(0, (min - 185) / 70);
  }
  return 0;
}

const input = "public/tfa-logo.png";
const output = "public/tfa-logo-transparent.png";
const trimmed = "public/tfa-logo-transparent-trimmed.png";

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.from(data);
for (let i = 0; i < out.length; i += info.channels) {
  const bg = backgroundness(out[i], out[i + 1], out[i + 2]);
  if (bg >= 0.85) out[i + 3] = 0;
  else if (bg > 0.2) out[i + 3] = Math.round(out[i + 3] * (1 - bg));
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png()
  .toFile(trimmed);

await sharp(trimmed)
  .trim({ threshold: 1 })
  .extend({
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(output);

fs.unlinkSync(trimmed);
console.log("✓", output);

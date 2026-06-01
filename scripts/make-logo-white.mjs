#!/usr/bin/env node
/** Regenerate public/tfa-logo-white.png from public/tfa-logo-transparent.png */
import fs from "fs";
import sharp from "sharp";

const input = "public/tfa-logo-transparent.png";
const output = "public/tfa-logo-white.png";

if (!fs.existsSync(input)) {
  console.error("Missing", input, "— run npm run logo:transparent first");
  process.exit(1);
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.from(data);
for (let i = 0; i < out.length; i += info.channels) {
  const a = out[i + 3];
  if (a <= 8) {
    out[i + 3] = 0;
    continue;
  }
  out[i] = 255;
  out[i + 1] = 255;
  out[i + 2] = 255;
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png()
  .toFile(output);

console.log("✓", output);

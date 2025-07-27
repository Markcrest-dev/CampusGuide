#!/usr/bin/env node

/**
 * Icon generator script for PWA
 * Creates placeholder icons for development
 */

import fs from 'fs';
import path from 'path';

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDir = 'public/icons';

// Ensure icons directory exists
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// Generate simple SVG icons as placeholders
const generateSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0ea5e9"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.3}" fill="white" text-anchor="middle" dominant-baseline="middle">SG</text>
</svg>`;
};

// Generate PNG placeholder info
const generatePNGPlaceholder = (size) => {
  return `<!-- Placeholder for ${size}x${size} PNG icon -->
<!-- To generate actual icons, use a tool like:
     - https://realfavicongenerator.net/
     - https://www.pwabuilder.com/imageGenerator
     - npx pwa-asset-generator logo.svg public/icons
-->`;
};

console.log('🎨 Generating PWA icons...');

iconSizes.forEach(size => {
  // Generate SVG placeholder
  const svgContent = generateSVGIcon(size);
  const svgPath = path.join(iconDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  
  // Generate PNG placeholder info
  const pngInfo = generatePNGPlaceholder(size);
  const pngInfoPath = path.join(iconDir, `icon-${size}x${size}.png.info`);
  fs.writeFileSync(pngInfoPath, pngInfo);
  
  console.log(`✅ Generated placeholder for ${size}x${size}`);
});

// Generate additional icons
const additionalIcons = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.ico', size: 32 },
  { name: 'badge-72x72.png', size: 72 }
];

additionalIcons.forEach(({ name, size }) => {
  const svgContent = generateSVGIcon(size);
  const svgPath = path.join(iconDir, `${name}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Generated ${name} placeholder`);
});

console.log(`
🎨 Icon generation complete!

📝 Next steps:
1. Replace SVG placeholders with actual PNG icons
2. Use a tool like pwa-asset-generator for production icons:
   npx pwa-asset-generator logo.svg public/icons --manifest public/manifest.json

3. Or use online generators:
   - https://realfavicongenerator.net/
   - https://www.pwabuilder.com/imageGenerator

📁 Icons location: ${iconDir}/
`);

export default { iconSizes, iconDir };

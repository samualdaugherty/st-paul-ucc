#!/usr/bin/env node

/**
 * Script to remove Webflow animation styles from page files
 * This removes all opacity:0 and transform inline styles
 */

const fs = require('fs');
const path = require('path');

const files = [
  'src/app/page.tsx',
  'src/app/calendar/page.tsx',
  'src/app/worship-spiritual-life/page.tsx',
  'src/app/community-outreach/page.tsx',
  'src/app/contact-us/page.tsx',
  'src/app/special-music/page.tsx',
  'src/app/licensing/page.tsx',
  'src/app/leadership/page.tsx',
];

// Regex patterns to remove
const patterns = [
  // Remove data-w-id attributes
  /\s*data-w-id="[^"]*"/g,
  // Remove style props with opacity:0 and transforms
  /\s*style=\{\{[^}]*opacity:\s*0[^}]*\}\}/g,
  // Remove standalone data-name attributes from Webflow
  /\s*data-name="[^"]*"/g,
];

files.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} (not found)`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalLength = content.length;
  
  // Apply all patterns
  patterns.forEach(pattern => {
    content = content.replace(pattern, '');
  });
  
  // Clean up double spaces that might result
  content = content.replace(/  +/g, ' ');
  // Clean up empty lines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  const removed = originalLength - content.length;
  if (removed > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath}: Removed ${removed} characters of animation styles`);
  } else {
    console.log(`✓ ${filePath}: Already clean`);
  }
});

console.log('\n✨ All files processed!');


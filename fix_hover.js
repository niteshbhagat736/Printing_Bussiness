const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /text-slate-950/g, replacement: 'text-gray-900' },
  { regex: /text-gray-600 hover:text-white/g, replacement: 'text-gray-600 hover:text-indigo-600' },
  { regex: /hover:border-slate-600/g, replacement: 'hover:border-gray-400' },
  { regex: /bg-white border-gray-200 text-gray-600 hover:text-indigo-600 hover:bg-gray-100/g, replacement: 'bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100' },
  { regex: /hover:text-white hover:bg-white/g, replacement: 'hover:text-indigo-600 hover:bg-gray-50' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const rule of replacements) {
        content = content.replace(rule.regex, rule.replacement);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));

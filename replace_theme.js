const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /bg-slate-950/g, replacement: 'bg-gray-50' },
  { regex: /bg-slate-900/g, replacement: 'bg-white' },
  { regex: /bg-slate-800/g, replacement: 'bg-gray-100' },
  { regex: /bg-slate-700/g, replacement: 'bg-gray-200' },
  { regex: /border-slate-800/g, replacement: 'border-gray-200' },
  { regex: /border-slate-700/g, replacement: 'border-gray-300' },
  { regex: /text-slate-100/g, replacement: 'text-gray-900' },
  { regex: /text-slate-200/g, replacement: 'text-gray-800' },
  { regex: /text-slate-300/g, replacement: 'text-gray-700' },
  { regex: /text-slate-400/g, replacement: 'text-gray-600' },
  { regex: /text-slate-500/g, replacement: 'text-gray-500' },
  { regex: /bg-black/g, replacement: 'bg-white' },
  // specific targeted text-white replacements when it's next to bg-white or gray
  // wait, a simpler approach is to replace text-white only if there's no bg-primary like bg-indigo-600.
  // Actually, let's look at the class strings directly or just let text-white be manually fixed if we see bugs.
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
      
      // Handle text-white
      // If it's a primary button, it usually has bg-indigo-X or bg-blue-X.
      // We will replace text-white with text-gray-900 only if it's NOT accompanied by a primary color background in the same className string.
      content = content.replace(/className="([^"]+)"/g, (match, classes) => {
        if (classes.includes('text-white')) {
          if (!classes.includes('bg-indigo-') && !classes.includes('bg-amber-') && !classes.includes('bg-blue-') && !classes.includes('bg-cyan-') && !classes.includes('bg-emerald-') && !classes.includes('bg-rose-')) {
            classes = classes.replace(/\btext-white\b/g, 'text-gray-900');
          }
        }
        return `className="${classes}"`;
      });
      
      // Also handle className={`...`} template literals
      content = content.replace(/className=\{`([^`]+)`\}/g, (match, classes) => {
        if (classes.includes('text-white')) {
          if (!classes.includes('bg-indigo-') && !classes.includes('bg-amber-') && !classes.includes('bg-blue-') && !classes.includes('bg-cyan-') && !classes.includes('bg-emerald-') && !classes.includes('bg-rose-')) {
            classes = classes.replace(/\btext-white\b/g, 'text-gray-900');
          }
        }
        return `className={\`${classes}\`}`;
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));

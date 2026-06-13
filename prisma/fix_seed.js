const fs = require('fs');
const path = require('path');

const filePath = path.join('E:', 'GDC', 'Website', 'prisma', 'seed.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Use regex to remove "attendees": ..., and "rating": ..., lines from seed.ts
content = content.replace(/^\s*"attendees":.*$/gm, '');
content = content.replace(/^\s*"rating":.*$/gm, '');

// Clean up any double empty lines that might have been created
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully fixed seed.ts');

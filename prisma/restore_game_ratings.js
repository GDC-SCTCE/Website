const fs = require('fs');
const path = require('path');

const filePath = path.join('E:', 'GDC', 'Website', 'prisma', 'seed.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The 4 games in order
content = content.replace(
  /"developer": "Abhirag R Nair & Johan Gejo",/g,
  '"developer": "Abhirag R Nair & Johan Gejo",\n      "rating": 4.8,'
);
content = content.replace(
  /"developer": "Aleena Thomas & Nidhim Nair",/g,
  '"developer": "Aleena Thomas & Nidhim Nair",\n      "rating": 4.5,'
);
content = content.replace(
  /"developer": "Gagandeep M",/g,
  '"developer": "Gagandeep M",\n      "rating": 4.6,'
);
content = content.replace(
  /"developer": "GDSC Game Dev Team",/g,
  '"developer": "GDSC Game Dev Team",\n      "rating": 4.9,'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Restored game ratings!');

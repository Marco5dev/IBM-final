const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '.keep'), '');
  console.log('Created uploads directory');
} else {
  console.log('Uploads directory already exists');
}

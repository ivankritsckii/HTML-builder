const fs = require('fs');
const path = require('path');
const steam = fs.createReadStream(
    path.join(__dirname, 'text.txt'), 'utf-8'
)
let ac = ''
steam.on('data', (chunk) => ac += chunk)
steam.on('end', () => console.log(ac))
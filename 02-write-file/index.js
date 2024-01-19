const fs = require('fs');
const path = require('path');
const readline = require('readline');

let output = fs.createWriteStream(path.join(__dirname, '02-write-file'));

console.log('Add text');

const{ stdin } = process;

stdin.on('data', (item) => {
    let a = item.toString();
    if(a === 'exit\r\n') {
        process.exit()
    }
    output.write(item)
})

process.on('exit', ()=> console.log('Good by'));
process.on('SIGINT', () => process.exit())


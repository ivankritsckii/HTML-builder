const { stat, readdir, unlink, open} = require('fs/promises');
const fs = require('fs');
const path = require('path')

let styleDir = path.join(__dirname, 'styles');


let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(styleDir, {withFileTypes: true}, (err, files) => {
    files.forEach((item) => {
        if(!item.isDirectory()) {
            if(path.extname(item.name) === '.css') {
                let input = fs.createReadStream(path.join(__dirname, 'styles', item.name));
                input.on('data', (chunk) => output.write(chunk))
            }
        }
    })
})

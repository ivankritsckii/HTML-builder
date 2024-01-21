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





/*
async function bundleCreator() {
    fs.open(path.join(styleDir, 'bundle.css'), 'r', (err) => {console.log(err)})
}


async function bundleDeleter() {
    const Items = await readdir(styleDir);
    unlink(path.join(__dirname, 'styles', 'bundle.css'))
}

stat(path.join(__dirname, 'styles', 'bundle.css'))
    .then(() => {
        bundleDeleter()  
    })
    .catch(() => {
        bundleCreator()
    })*/
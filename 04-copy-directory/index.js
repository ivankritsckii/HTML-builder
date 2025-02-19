const { readdir, mkdir, stat, copyFile, unlink } = require('fs/promises');
const path = require('path');

const startFolder = path.join(__dirname, 'files');
const resFolder = path.join(__dirname, 'files-copy');

async function deleteItem() {
    const Items = await readdir(resFolder);
    for(const item of Items) {
        const filePath = path.join(resFolder, item);
        unlink(filePath);
    }
}

async function copyItem () {
    const Items = await readdir(startFolder);
    for (const item of Items) {
        const filePath = path.join(startFolder,item);
        const destPath = path.join(resFolder,item);
        await copyFile(filePath, destPath)
    }
}



stat (resFolder)
    .then(() =>{
        deleteItem();
    })
    .catch(() => {
        mkdir(resFolder, {recursive: true})
    })
    .finally(() =>{
        copyItem()
    })
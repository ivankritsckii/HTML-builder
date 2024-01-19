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



 





/*let fs = require('fs');
let path = require('path');
const { stdin, stdout } = process;

let startFolder = path.join(__dirname, 'files')
let resFolder = path.join(__dirname, 'files-copy');
async function deleteDir () {
    fs.rm(resFolder, { recursive: true }, (err2) => {1});
}
deleteDir ()

async function createDir () {
    await fs.promises.mkdir(resFolder, (err) => {
    console.log(err)
});
}
//createDir()



fs.readdir(startFolder, {withFileTypes: true}, (err, file) =>{
    file.forEach((item) => {
        startFolder = path.join(__dirname, 'files', `${item.name}`);
        resFolder = path.join(__dirname, 'files-copy', `${item.name}`);
        fs.copyFile(startFolder, resFolder, (err) => {
            if(err) {
                //console.log(err)
            }
        })
    })
})
*/

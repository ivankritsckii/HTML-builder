const { readdir, unlink, mkdir, stat, readFile, writeFile, rm, copyFile } = require('fs/promises');
const { pipeline } = require('stream/promises');
const fs = require('fs')
let path = require('path');
let HTMLFilesObj = {};
let folderWithAssets = path.join(__dirname, 'assets');
let newFolderWithAssets = path.join(__dirname, 'project-dist', 'assets')

let resFolder = path.join(__dirname, 'project-dist')

async function FolderItemDeleter () {
    fs.readdir(resFolder,{withFileTypes: true}, (err, files) => {
        files.forEach((item) => {
            const deleteItem = path.join(resFolder, item.name);
            if(item.isFile()){
                unlink(deleteItem)
            } else {
                rm(deleteItem, {recursive: true})
            }
        })
    })
}
async function HTMLObjCreator () {
    const HTMLFiles = await readdir(path.join(__dirname, 'components'));
    for(file of HTMLFiles) {
        let fileName = [...file].splice(0, file.length - 5).join('');
        HTMLFilesObj[fileName] = await readFile(path.join(__dirname, 'components', file), 'utf-8')
    }
    return HTMLFilesObj
}

 const render = async () => {
try{
    await stat(resFolder)
    await FolderItemDeleter()
} catch {
    await mkdir(resFolder, {recursive:true});
} 
finally {
    await HTMLObjCreator();
    await IndexCrearor();
    await CssCreator ();
    await assetsCreator ();
    await assetsCopy (folderWithAssets, newFolderWithAssets)
}
 }
 render();

/*работа с index.html*/
async function IndexCrearor () {
    const htmlOutput = fs.createWriteStream(path.join(resFolder, 'index.html'));
    const htmlInput = fs.createReadStream(path.join(__dirname, 'template.html'));
    htmlInput.on('data', (chunk) => {
        for (let item in HTMLFilesObj) {
            chunk = chunk.toString()
            chunk = chunk.replace(`{{${item}}}`, HTMLFilesObj[item])
        }
        htmlOutput.write(chunk)
    })
}

/*работа с css*/
async function CssCreator () {
    const cssOuput = fs.createWriteStream(path.join(resFolder, 'style.css'));
    const allStyles = await readdir(path.join(__dirname, 'styles'));
    for(let item of allStyles) {
        const cssInput = fs.createReadStream(path.join(__dirname, 'styles', item));
        cssInput.on('data', (chunk) =>{
            cssOuput.write(chunk)
        })
    }
}

/*копирование файлов из assets*/
async function assetsCreator () {
    const newAssetsFolder = path.join(resFolder, 'assets')
    await mkdir(newAssetsFolder, {recursive:true});
    
}
async function assetsCopy (folder, newFolder) {
    fs.readdir(folder, {withFileTypes:true}, (err, data) => {
        data.forEach(async (item) => {
            if(!item.isFile()) {
                await mkdir(path.join(newFolder, item.name), {recursive:true})
                return assetsCopy (path.join(folder, item.name), path.join(newFolder, item.name))
            } else {
                await copyFile(path.join(folder, item.name), path.join(newFolder, item.name))
            }
        })
    })
}
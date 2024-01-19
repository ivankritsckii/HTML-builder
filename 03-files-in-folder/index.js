let fs = require('fs');
let path = require('path');


let dir = path.join(__dirname, 'secret-folder');
fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    let arr = files.map((item) => {
        if(item.isFile()){
            return item
        }})
    arr = arr.filter((i) => !!i);
    let arrNames = arr.map((item) =>{
        return item.name.split('.')
    });
    let arrSize = arr.map((item, index) =>{
        fs.stat(path.join(dir, item.name), (err, stats) =>{
            console.log(`${arrNames[index][0]} - ${arrNames[index][arrNames[index].length - 1]} -${stats.size / 1000}kb`);
            return 1
        });
    })
});



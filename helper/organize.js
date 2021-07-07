const fs = require('fs');
const path = require('path');

const types = {
    media: ['mp4', 'mkv'],
    archive: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'odp', 'odg', 'txt', 'ps'],
    app: ['exe', 'dmg', 'pkg', 'deb', 'msi'],
    programming: ['js', 'java', 'c', 'c++', 'ts', 'json', 'py']
}

// organize function
function organizeFn(dirPath) {
    let destPath;
    // console.log('organize command implemented');
    // 1. input-> directory path given
    if (dirPath === undefined) {
        destPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            // 2. create organize_file directory
            destPath = path.join(dirPath, 'organize_files');
            if (fs.existsSync(destPath) === false) {

                fs.mkdirSync(destPath);
            }

        } else {
            console.log('kindly enter the correct path');
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}

// organize helper
function organizeHelper(src, dest) {
    // 3. identify categories of all files present in the same directory
    let childName = fs.readdirSync(src);
    // console.log(childName);
    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(src, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childName[i]);
            let category = getCategories(childName[i]);
            console.log(childName[i], 'belongs to ->', category);
            // 4. copy / cut files to that organize directory inside of any of categories
            sendFile(childAddress, dest, category);

        }
    }

}

// sendFile
function sendFile(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) === false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, 'copied to', category);
}


// getCategories
function getCategories(name) {
    let ext = path.extname(name);
    ext = ext.slice(1)
    console.log(ext);
    for (let type in types) {
        let cTypeArr = types[type];
        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext === cTypeArr[i]) {
                return type;
            }
        }
    }
    return 'others'
}

module.exports = {
    organizeKey: organizeFn
}
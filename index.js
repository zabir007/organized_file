#!/usr/bin/env node

const helpObj = require('./helper/help')
const treeObj = require('./helper/tree')
const organizeObj = require('./helper/organize')

let inputArr = process.argv.slice(2);
console.log(inputArr);

let command = inputArr[0];
switch (command) {
    case 'tree':
        treeObj.treeKey(inputArr[1]);
        break;
    case 'organize':
       organizeObj.organizeKey(inputArr[1]);
        break;
    case 'help':
        helpObj.helpKeys();
        break;
    default:
        console.log('pleasse 🙏 input the right command');
}






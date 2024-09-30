const fs = require('fs');
const path = require('path');

const sourceDir1 = path.join(__dirname,"..","package.json");
const sourceDir2 = path.join(__dirname,"..","config");
const outDir1 = path.join(__dirname, '..', 'dist');
const outDir2 = path.join(__dirname, '..', 'dist/config');

if(!fs.existsSync(outDir2)){
  fs.mkdirSync(outDir2);
}else{
  deleteFolderRecursive(outDir2)
  fs.mkdirSync(outDir2);
}
function copyFileSync(source, target) {
  let targetFile = target;

  // 如果目标是一个目录，则将源文件名附加到目标目录上
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  let files = [];

  // 检查源路径是否存在
  if (fs.existsSync(source)) {
    // 读取源目录内容
    files = fs.readdirSync(source);

    files.forEach(function(file) {
      const curSource = path.join(source, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        // 如果是目录，则递归复制
        const curTarget = path.join(target, file);
        if (!fs.existsSync(curTarget)) {
          fs.mkdirSync(curTarget);
        }
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        // 如果是文件，则复制文件
        copyFileSync(curSource, target);
      }
    });
  }
}

copyFileSync(sourceDir1, outDir1);
copyFolderRecursiveSync(sourceDir2, outDir2);

function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // 如果是文件夹，递归删除
        deleteFolderRecursive(curPath);
      } else { // 如果是文件，直接删除
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath); // 删除空文件夹
  }
}

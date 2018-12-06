/**
 *
 * @param {删除文件夹} filePath
 */
const fs = require('fs');
const deleteDir = function(filePath) {
    const arg = arguments;
    try {
        if (fs.existsSync(filePath)) {
            const fileArr = fs.readdirSync(filePath);
            // if (fileArr.length !== 0) {
            fileArr.map(function(item, index) {
                const itemPath = `${filePath}/${item}`;
                if (fs.statSync(itemPath).isFile()) {
                    fs.unlinkSync(itemPath);
                } else {
                    const fsDir = fs.readdirSync(itemPath);
                    if (fsDir.length !== 0) {
                        arg.callee(itemPath);
                    } else {
                        fs.rmdirSync(itemPath);
                    }
                }
            });
            fs.rmdirSync(filePath);
        }
    } catch (e) {
        console.log(`${e}`);
    }
};

module.exports = {
    deleteDir
};

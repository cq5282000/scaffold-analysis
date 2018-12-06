const fs = require('fs');
const pageConfig = {};

/**
 * 判断文件是否有缺失
 * @param {modulePath} viewPath
 */
function fileIsLostOrNot(modulePath) {
    return [`${modulePath}/action.js`, `${modulePath}/index.js`, `${modulePath}/reducer.js`].some((item) => {
        return !fs.existsSync(item);
    });
}
/**
 * 生成页面配置
 * @param {*} viewPath
 */
function generateConfig(viewPath) {
    const glob = require('glob');
    const path = require('path');

    glob.sync(`${viewPath}/*/*`).map((file) => {
        // console.log(file);
        if (fileIsLostOrNot(file)) {
            // throw new Error(`something is wrong with ${file}`);
            return;
        }
        const fileArr = file.split('/').slice(-3, -1);
        if (pageConfig[fileArr[0]]) {
            pageConfig[fileArr[0]].push(fileArr[1]);
        } else {
            pageConfig[fileArr[0]] = [];
            pageConfig[fileArr[0]].push(fileArr[1]);
        }
    });
    return pageConfig;
}

/**
 * 写文件
 */
function writeFile(srcPath, distPath, data) {
    //
}
module.exports = {
    generateConfig
};

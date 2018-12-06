const fs = require('fs');
const path = require('path');
const glob = require('glob');
const pageConfig = {};
const pageConfiged = {};
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

    glob.sync(`${viewPath}/*/*/`).map((file) => {
        if (fileIsLostOrNot(file)) {
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
 * @param {*} srcPath
 * @param {*} distPath
 * @param {*} data
 */
function writeFile(srcPath, distPath, data) {
    //
    const templateStr = fs.readFileSync(srcPath, 'utf-8');
    fs.writeFileSync(distPath, templateStr, 'utf-8');
}

/**
 * 大小写转换
 * @param {*} str
 */
function firstLetterToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * 用户可以在page下面自定义页面配置，读取page下面的页面配置，有的话使用page下面的页面的自定义配置，没有的话则生成
 * @param {*} page
 * @param {*} pageModules
 */

function generatePageFile(page, pageModules) {
    let fileStr = "import React from 'react';\n\n";
    fileStr += 'let action = {};\nlet moduleMapReducerAndView = {};\n\n';
    pageModules.map((module) => {
        fileStr += `import ${module}Action from '@view/${page}/${module}/action';\n`;
        let Module = firstLetterToUpperCase(module);
        fileStr += `import ${Module} from '@view/${page}/${module}';\n`;
        fileStr += `import ${module}Reducer from '@view/${page}/${module}/reducer';\n`;
        fileStr += `moduleMapReducerAndView['${module}'] = {
    reducer: ${module}Reducer,
    view: <${Module} key={'${module}'} />
};\n\n`;
        fileStr += `action['${module}'] = ${module}Action;\n`;
    });
    fs.writeFileSync(path.resolve(__dirname, `../build/pages/${page}.js`), fileStr, 'utf-8');
}
module.exports = function(viewPath) {
    // generateConfig
    let pagesPath = path.resolve(viewPath, '../pages');
    glob.sync(`${pagesPath}/*.js`).map((pageConfig) => {
        const basename = path.basename(pageConfig, '.js');
        writeFile(pageConfig, path.resolve(__dirname, `../build/pages/${basename}.js`));
        pageConfiged[basename] = true;
    });
    let pageConfig = generateConfig(viewPath);
    Object.keys(pageConfig).map((page) => {
        if (pageConfiged[page]) {
            return;
        }
        generatePageFile(page, pageConfig[page]);
    });
};

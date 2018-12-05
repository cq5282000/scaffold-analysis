#!/usr/bin/env node

/**
 * 获取环境变量env
 */
const path = require('path');
let env = process.env.NODE_ENV || 'production';
const { execSync } = require('child_process');
const ROOT_PATH = process.cwd();
const SCAFFOLD_ANALYSIS = path.dirname(path.resolve(require.main.filename, '..'));
switch (process.argv[2]) {
    case 'start':
        console.log('hello statr');

        break;
    case 'build':
        console.log('hello build');
        execSync(`gulp --gulpfile ${SCAFFOLD_ANALYSIS}/gulpfle.js`);
        break;
    default:
        break;
};
#!/usr/bin/env node

// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);
// console.log(process.argv[3]);

const regex = /^NODE_ENV=(.*)$/g;

/**
 * 获取环境变量env
 */
let env = 'production';

process.argv[3] &&
process.argv[3].match(regex).length !== 0 &&
(env = process.argv[3].match(regex)[0].split('=')[1]);

console.log(process.env.NODE_ENV);

switch (process.argv[2]) {
    case 'start':
        console.log('hello statr');
        break;
    case 'build':
        console.log('hello build');
        break;
    default:
        break;
};
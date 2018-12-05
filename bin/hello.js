#!/usr/bin/env node

console.log('123');
console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(process.argv[2]);
console.log(process.argv[3]);

const regex = /^NODE_ENV=(.*)$/g;

const env = process.argv[3].match(regex)[0].split('=')[1];

console.log(env);
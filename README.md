## 架构分析

### 2018年12月5日

#### 自定义命令

 - npm init 初始化package.json

 - 设置package.json的bin属性作为命令名称到本地执行文件的映射，一旦安装的时候，npm将把这个指令链接的文件全局安装到prefix／bin，或者链接到./node_modules/.bin/进行本地安装

 ```javascript
 "bin": {
     "hello": "./bin/hello.js"
 }
 ```

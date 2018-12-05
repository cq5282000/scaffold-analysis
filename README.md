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

  - 如果不设置指令，默认执行使用name属性作为指令名称。

 ```javascript
 "bin": "./bin/hello.js"
 ```
  - 关联的文件必须以 #!/usr/bin/env node 开始，否则无法使用node指令执行

  - 发布安装后可以测试指令，本地测试的话，执行 npm link，然后输入hello，可以看到文件执行

  - npm link，在本地开发npm模块的时候，我们可以使用npm link命令，将npm模块连接到对应的运行项目中去，方便的对模块进行调试和测试。


#### 关于npm link指令

 - 解决我们包开发过程中的安装调试问题

 - 在当前开发包里调用npm link会创建一个软链到全局安装包目录,例如在当前目录下执行

 ```bash
 /usr/local/lib/node_modules/scaffold-analysis -> /Users/chenqu/Documents/project-personal/scaffold-analysis
 ```
- 在调用的工程里执行npm link scaffold-analysis会创建一个映射到对应工程包的软链。

/Users/chenqu/Documents/project-personal/webpack4/node_modules/scaffold-analysis -> /usr/local/lib/node_modules/scaffold-analysis -> /Users/chenqu/Documents/project-personal/scaffold-analysis
---
lang: zh-CN
title: node.js
icon: nodeJS
date: 2023-02-03
description:
category:
  - node
tag:
  - node
  - fs文件系统模块
  - path路径模块
  - http服务模块
  - 模块化
  - CommonJS
sticky: 98
star: true
---

<!-- node.js -->

> [Node.js 中文官方文档](https://www.nodeapp.cn/)

## fs 文件系统模块

文件 I/O 是对标准 POSIX 函数的简单封装。 通过 `require('fs')` 使用该模块。 所有的方法都有异步和同步的形式。

### fs.readFile

读取文件内容

```js
const fs = require("fs");
// 参数一：读取文件的路径 必填
// 参数二：编码格式 选填 默认utf-8
// 参数三：回调函数 err 错误信息 data 读取的文件内容
fs.readFile("../commonText/01-text", "utf-8", (err, data) => {
  // 有错误抛出错误
  if (err) throw err;
  console.log("🚀 ~ file: 01-readFile.js:4 ~ fs.readFile ~ data", data);
});
```

### writeFile

向文件写入内容

```js
const fs = require("fs");
// 参数一：需要被写入文件的路径 必填
// 参数二：写入的内容 必填
// 参数三：编码格式 选填 默认utf-8
// 参数四：回调函数 err 错误信息
fs.writeFile("../commonText/01-text", "小红", (err) => {
  console.log("🚀 ~ file: 02-writeFile.js:7 ~ fs.readFile ~ err", err);
  // 文件写入成功 err为null否则为错误对象
  if (err) throw err;
});
```

## path 路径模块

path 模块提供了一些工具函数，用于处理文件与目录的路径。

### 解决动态拼接路径问题

在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的相对路径时，容易出现路径动态拼接错误的问题,\_\_dirname 获取文件所处的绝对路径

### join

拼接路径

```js
const path = require("path");
// path.join 拼接路径
// __dirname 当前文件所在文件夹的绝对路径
const str = path.join(__dirname, "./a");
console.log("🚀 ~ file: 01-join.js:4 ~ str", str);
```

### basename

获取路径最后一级的文件名

```js
const path = require("path");
const pathStr = __dirname + "/index.html";
// path.basename 获取路径最后一级的文件名
// 参数一：需要获取的路径 必填
// 参数二：去掉一部分，获取新的名称 不传则输出index.html 传输.html 则去掉.html部分输出index 可选
const str = path.basename(pathStr, ".html");
console.log("🚀 ~ file: 02-basename.js:4 ~ str", str);
```

### extname
获取路径的扩展名

```js
const path = require("path");
const pathStr = __dirname + "/index.html";

// path.extname 获取文件的扩展名(例如.html,.js) 如果没有扩展名则返回空
// 参数一：需要获取的路径 必填

const str = path.extname(pathStr);
console.log("🚀 ~ file: 03-extname.js:6 ~ str", str);
```

## http 服务模块

http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。

### 创建一个基本的 web 服务

```js
// 1.导入http模块
const http = require("http");

// 2.使用createServer()方法创建web服务实例
const server = http.createServer();

// 3.绑定request事件 监听客户端请求
// req(请求对象) res(响应对象)
server.on("request", (req, res) => {
  console.log("🚀 ~ file: 01-http.js:10 ~ req", req.url);
  console.log("🚀 ~ file: 01-http.js:10 ~ req", req.method);
  // end() 响应客户端的数据
  res.end("node.js");
});

// 4.启动服务器
server.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

### Request 和 Response 对象

首先是 Request 请求对象，通常我们习惯用 req 变量来表示。
Request 请求对象 req 表示

- req.end([data[encoding]][callback])
  - data 需要传的数据
  - encoding 编码格式
  - callback 请求流结束时会被调用

Response 响应对象

- req.query 接受客户端的请求参数
- req.params 接受动态参数

### 根据请求类型和路径返回不同的数据

```js
const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  const url = req.url;
  // 设置默认的响应内容为 404 Not found
  let content = "<h1>404 Not found!</h1>";
  // 判断用户请求的是否为 / 或 /index.html 首页
  // 判断用户请求的是否为 /about.html 关于页面
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页</h1>";
  } else if (url === "/about.html") {
    content = "<h1>关于页面</h1>";
  }
  // setHeader 设置Content-Type 解决中文乱码
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(content);
});

server.listen(80, () => {
  console.log("server running at http://127.0.0.1");
});
```

## 模块化

### 什么是模块化？

模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元

### 模块化有什么好处

- 避免变量污染，命名冲突
- 提高了代码的复用性
- 提高了代码的可维护性
- 可以实现按需加载

### Node.js 中模块化

- 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
- 自定义模块（用户创建的每个 .js 文件，都是自定义模块）
- 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

### 加载模块

::: tip

1. / 代表绝对路径，./ 代表相对路径
2. 默认后缀为：.js .json .node, 如果省略后缀的话，优先级为 js > json > node，则会先查找 js 查找到之后就引入 js，不再查找
   :::

使用 require() 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。

```js
// 1.加载内置模块
const fs = require("fs");

// 2.加载自定义模块
const custom = require("./custom.js");

// 3.加载第三方模块 首先先要下载需要使用的模块
const express = require("express");
```

### 模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域，可以防止全局变量污染。

### 模块作用域中的成员

::: tip
最终暴露出来的对象永远以 module.exports 为准

:::

- module 对象
  - 在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息
  - module.exports 将模块内的成员共享出去，供外界使用
  - exports exports 和 module.exports 指向同一个对象，也是将模块内的成员共享出去

```js
module === module.exports; // true
```

### CommonJS 模块化规范

- 每个模块内部，module 变量代表当前模块
- module 变量是一个对象，module.exports 是对外的接口
- 加载某个模块即加载该模块的 module.exports 属性

### 模块加载机制

模块第一次加载后会被缓存，即多次调用 require() 不会导致模块的代码被执行多次，提高模块加载效率。

#### 内置模块加载

内置模块加载优先级最高。

#### 自定义模块加载

加载自定义模块时，路径要以 ./ 或 ../ 开头，否则会作为内置模块或第三方模块加载。

导入自定义模块时，若省略文件扩展名，则 Node.js 会按顺序尝试加载文件：

1. 按确切的文件名加载
2. 补全 .js 扩展名加载
3. 补全 .json 扩展名加载
4. 补全 .node 扩展名加载
5. 补全查找文件失败 报错

#### 第三方模块加载

若导入第三方模块， Node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块。
如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。
例如，假设在 C:\Users\project\node\foo.js 文件里调用了 require('my_fs')，则 Node.js 会按以下顺序查找：

1. C:\Users\project\node\node_modules\my_fs

2. C:\Users\project\node_modules\my_fs

3. C:\Users\node_modules\my_fs

4. C:\node_modules\my_fs

#### 目录作为模块加载

当把目录作为模块标识符进行加载的时候，有三种加载方式：

在被加载的目录下查找 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口
如果没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
若失败则报错

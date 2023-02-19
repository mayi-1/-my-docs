---
lang: zh-CN
title: Express
icon: snow
date: 2023-02-03
description:
category:
  - Express
tag:
  - Express
sticky: 98
star: true
---

> [Express 中文官方文档](https://www.expressjs.com.cn/)

## Express 初体验

### 安装 Express

```npm
npm install express --save
```

### 创建基本服务器

```js
const express = require("express");
const app = express();
// 指定端口号
const port = 3000;

// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get("/user", (req, res) => {
  res.send({ name: "zs", age: 20, gender: "男" });
});
app.post("/user", (req, res) => {
  res.send("请求成功");
});

app.get("/", (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的查询参数
  console.log(req.query);
  res.send(req.query);
});

// 这里的 :id 是一个动态的参数
app.get("/user/:ids/:username", (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认是一个空对象
  console.log(req.params);
  res.send(req.params);
});

// 运行服务
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### Request 和 Response 对象

Request 请求对象，用 req 变量来表示。下面列举一些 req 上比较重要的成员：

- req.body：客户端请求体的数据，可能是表单或 JSON 数据
- req.params：请求 URI 中的路径参数
- req.query：请求 URI 中的查询参数
- req.cookies：客户端的 cookies

Response 响应对象，通常用 res 变量来表示，可以执行一系列响应操作

- res.send('HTML String')：发送一串 HTML 代码
- res.sendFile('file.zip')：发送一个文件
- res.render('index')：渲染一个模板引擎并发送

### 托管静态资源

使用`express.static()`托管静态资源

```js
const express = require("express");
const app = express();
// 使用appapp.static("/file").use()注册
// app.use('访问前缀',app.static("需要托管的文件夹"));

// 1.访问地址 http://localhost:8080/user.html (user.html:file文件夹里面的user.html)
app.use(app.static("/file"));
// 2.访问地址 http://localhost:8080/common/user.html (user.html:file文件夹里面的user.html)
app.use("/common", app.static("/file"));
```

## Express 中的路由

### 什么是路由

Node.js 路由是指在 Node.js 中用于处理 HTTP 请求的系统。它可以控制应用程序的路径，决定应该执行哪些代码，并且返回相应的结果，简单来说路由就是指客户端的请求与服务器处理函数之间的映射关系。

### 路由的组成部分

1. 请求类型
2. 请求的 URL 地址
3. 处理函数

### 路由匹配过程

每当一个请求到达服务器之后，按照先后顺序的匹配需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。
在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转 function 函数进行处理。

### 路由的基本使用

```js
// 路由栗子🌰
const express = require("express");
const app = express();
// 直接在app上挂载路由
app.get("/user", (req, res) => {
  console.log("🚀 ~ file: 03-query.js:7 ~ app.get ~ req.query", req.query);
  res.send({ name: "zs" });
});
app.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

### 路由模块化

在平常的 javascript 中也有自己的模块化，例如使用 script 标签产生的作用域隔离，也算是模块化，在 node 路由中也有自己的模块化，模块化可以是我们更好的维护代码，提高代码的阅读性，所以 Express 不建议将路由像前面的 🌰 一样挂载在 app 上，而是推荐将路由抽离为单独的模块

1. 创建路由模块对于的.js 文件
2. 调用 express.Router()函数创建路由
3. 在路由对象上挂载具体的路由
4. 使用 module.exports 向外共享路由
5. 在入口.js 文件中导入路由模块
6. 使用 app.use()注册路由

路由模块化 🌰

```js
// 入口文件 app.js
const express = require("express");
const app = express();
// 导入user模块
const router = require("./02-user.js");
// 注册路由模块
app.use(router);

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

```js
// 路由模块 user.js
const express = require("express");

const router = express.Router();

router.get("/user/info", (req, res) => {
  res.send({ name: "zs", age: 18 });
});

module.exports = router;
```

### 为路由添加前缀

类似于`express.static()`，为静态资源统一挂载访问前缀一样，在路由模块中添加前缀也是一样，以上面 🌰 做参考，在注册的时候加上访问前缀即可

```js
// 导入user模块 http://127.0.0.1/user/info 即可访问
// const router = require("./02-user.js");

// 导入user模块 加上前缀 http://127.0.0.1/api/user/info 即可访问
const router = require("/api", "./02-user.js");
// 注册路由模块
app.use(router);
```

## 中间件

### 什么是中间件

中间件（middleware）特指业务流程的中间处理环节

### 中间件的调用流程

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理

### Express 中间件的格式

本质上是一个 function 处理函数，中间件函数的形参列表中，必须包含 next 参数，而路由处理函数只包含 req 和 res，next 函数是实现多个中间件连续调用的关键，它表示将流转关系流转给下一个中间件或者路由

### 定义一个中间件

```js
// 定义一个最简单的中间件函数
const mw = (req, res, next) => {
  console.log("这是最简单的中间件函数");
  // 把流转关系，转交给下一个中间件或者路由
  next();
};
```

### 全局生效的中间件

> 如果定义多个中间件，则会按照顺序进行调用

客户端发起的任何请求，到达服务器之后都会触发的中间件，叫做全局生效中间件，通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件

```js
app.use(mw1);
app.use(mw2);
const mw1 = (req, res, next) => {
  console.log("全局生效的中间件1");
  next();
};

const mw2 = (req, res, next) => {
  console.log("全局生效的中间件2");
  next();
};
```

### 局部生效的中间件

> 局部定义多个中间件的时候可以使用数组或者逗号分隔开，两种形式都是一样的效果，如下

不使用 app.use() 定义的中间件，叫做局部生效的中间件，不会影响下游的中间件和路由，只会对当前路由有影响

```js
// 定义单个
app.get("/user", mw1, (req, res) => {
  res.send("局部生效的中间件");
});

// 定义多个
// 1. 数组形式
app.get("/user", [mw1, mw2], (req, res) => {
  res.send("局部生效的中间件");
});

// 2.逗号分隔
app.get("/user", mw1, mw2, (req, res) => {
  res.send("局部生效的中间件");
});
```

### 中间件的作用

多个中间件之间，可以共享同一份 req 和 res，基于这样的特性，我们可以在上游的中间件中统一为 req 和 res 添加自定义属性和方法，供下游的中间件或路由进行使用

```js
const express = require("express");
const app = express();

const vm = (req, res, next) => {
  req.time = new Date(); // "2023-02-11T10:03:15.320Z"
  next();
};
app.use(vm);

app.get("/user", (req, res) => {
  console.log(req.time); // "2023-02-11T10:03:15.320Z"
  res.send(req.time);
});

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

### 中间件使用注意事项

1. 除错误级别中间件外，其他类型中间件一定要在路由之前注册
2. 客户端发送过来的请求，可以连续调用多个中间件进行处理
3. 执行完中间件的业务代码之后，不要忘记调用 next() 函数
4. 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
5. 连续调用多个中间件时，多个中问件之间，共享 req 和 res 对象

### 中间件的分类

1. [应用级别的中间件](#应用级别的中间件)
2. [路由级别的中间件](#路由级别的中间件)
3. [错误级别的中间件](#错误级别的中间件)
4. [Express 内置的中间件](#内置的中间件)
5. [第三方的中间件](#第三方的中间件)

#### <a id="应用级别的中间件">1.应用级别的中间件</a>

通过 app.use()或 app.get()或 app.post()，绑定到 app 实例上的中间件，叫做应用级别的中间件

```js
const express = require("express");
const app = express();

const mw = (req, res, next) => {
  res.send("中间件");
  next();
};
// 挂载在app实例上 应用级别的中间件（全局中间件）
app.use(mw);

// 挂载在app实例上 应用级别的中间件（局部中间件）
app.get("/user", mw, (req, res) => {
  res.send("应用级别中间件");
});

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

#### <a id="路由级别的中间件">2.路由级别的中间件</a>

绑定到 express.Router()实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上。

```js
const express = require("express");
const router = express.Router();

// 路由级别的中间件
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

module.exports = router;
```

#### <a id="错误级别的中间件">3.错误级别的中间件</a>

> 错误级别的中间件，必须注册在所有路由之后，如果放在前面会导致在该中间件之后的错误无法被捕获

错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题,错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是(err, req, res, next)。

```js
// 路由
app.get("/user", (req, res) => {
  throw new Error("服务器内部发生了错误！");
  res.send("Home Page");
});

// 错误级别的中间件，捕获整个项目的异常错误
app.use((err, req, res, next) => {
  console.log("Error: " + err.message);
  res.send("Error: " + err.message);
});
```

#### <a id="内置的中间件">4.内置的中间件</a>

自 Express4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验

1. express.static 快速托管静态资源的内置中间件，例如：HTML 文件、图片、CSS 样式等（无兼容性）
2. express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+版本中可用）
3. express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+版本中可用）

```js
// 配置解析 application/json 格式数据的内置中间件
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));
app.post("/user", (req, res) => {
  // 在服务器, 可以使用 req.body 这个属性，来接受客户端端发过来的请求体数据
  // 在默认情况下，如果把配置解析表单数据的中间价， 则 req.body 默认等于 undefined
  console.log(req.body);
  res.send("ok");
});
```

#### <a id="第三方的中间件">5.第三方的中间件</a>

非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。例如：在express@4.16.0之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。

**使用步骤：**

1. 运行 `npm install body-parser` 安装中间件
2. 使用 `require('body-parser')` 导入中间件
3. 调用 `app.use('body-parser')` 注册并使用中间件

### 自定义中间件

手动实现一个类似于`express.urlencoded`的中间件，来解析 POST 提交到服务器的表单数据，

1. 定义中间件
2. 监听 req 的 data 事件
3. 监听 req 的 end 事件
4. 使用 `querystring` 模块解析请求体数据
5. 将解析出来的数据对象挂载在 `req.body` 上
6. 将自定义的中间件封装为模块

```js
// app.js
const express = require("express");
const app = express();

const qs = require("./07-my-body-parser");
app.use(qs);
app.post("/user", (req, res) => {
  res.send(req.body);
});
app.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

```js
// 07-my-body-parser.js

// 内置模块 处理字符串
const qs = require("querystring");

// 中间件
const myQs = (req, res, next) => {
  let str = "";
  // 监听data事件，当客户端请求数据量较大的时候，无法一次发送完毕，
  // 则客户端会吧数据分割后发送给服务器，所以data事件可能触发多次，需要进行拼接
  req.on("data", (data) => {
    str += data;
  });
  // 监听end事件，数据发送完毕后触发
  req.on("end", () => {
    // 挂载在body属性上
    req.body = qs.parse(str);
    next();
  });
};
module.exports = myQs;
```

## 使用 Express 编写接口

### GET 接口

```js
const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  const query = req.query;
  res.send({
    success: true,
    message: "GET请求成功！",
    data: query,
  });
});

app.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

### POST 接口

```js
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.post("/user", (req, res) => {
  const body = req.body;
  res.send({
    success: true,
    message: "POST请求成功！",
    data: body,
  });
});
app.listen("80", () => {
  console.log("http://127.0.0.1");
});
```

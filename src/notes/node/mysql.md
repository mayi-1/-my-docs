---
lang: zh-CN
title: mysql
icon: mysql
date: 2023-02-014
description:
category:
  - mysql
tag:
  - mysql
sticky: 98
star: true
---

> [mysql 官方文档](https://docs.oracle.com/en-us/iaas/mysql-database/doc/getting-started.html)

## mysql 初体验

### 安装

1. 下载地址：https://www.mysql.com/downloads/
2. 滑倒网页最下方，选择`DOWNLOADS => MySQL -> Community  Server`

![下载mysql](/assets/node/mysql/xia_zai_mysql.png)

<!-- ### 创建数据库
1.  -->

<!-- DateType 数据类型
1. int 整数
2. varchar(len) 字符串(长度)
3. tinyint(1) 布尔值
字段的特殊标识
1. PK(Primary) 主键 唯一标识
2. NN(Not Null) 值不许为空
3. UQ(Unique) 值唯一
4. AI(Auto Increment) 值自动增长 -->

### 基本语句

> 查询：SELECT 属性,... FROM <表名> WHERE 条件

> 插入：INSERT INTO <表名> (属性,...) VALUES (值,...),...;

> 更新：UPDATE <表名> SET 属性 = 值,... WHERE 条件;

> 删除：DELETE FROM <表名> WHERE 条件;

> 排序 SELECT 属性,... FROM <表名> WHERE 条件 order by ... desc 降序/asc 升序

> where 子句：or(或) and(与)

> count(\*) 统计总数

> as 改变列名称

```sql
-- 查询语句
-- select * from 表名 查询users所有数据
select * from my_db_01.users
-- select 列名称 from 表名
select id,password from my_db_01.users

-- 升序查询
select id,password from my_db_01.users order by id asc

-- 降序查询
select id,password from my_db_01.users order by id desc

-- 插入语句
-- insert into 表名 (列名称1,列名称2,列名称3) values (值1,值2,值3)
insert into  my_db_01.users (username,password,status) values ('小郑',888552,1)
insert into  my_db_01.users (username,password,status) values ('a',888552,1)
-- 更新语句
-- update 表名 set 列名称=值 where 条件
update my_db_01.users set username='xiaoma',password='111' where id=11

-- 删除语句
-- delete from 表名 where 列名称=值

delete from my_db_01.users where id=12

-- where 子句

select * from my_db_01.users where id> 2

select * from my_db_01.users where id<>11

-- and or
select * from  my_db_01.users where id> 10 and username='xiaoma'

select * from  my_db_01.users where id=11 or status=1

-- order by 排序 asc 升序 desc 降序

select * from my_db_01.users order by id asc

select * from my_db_01.users order by id desc

-- 多重排序
select  * from my_db_01.users order by id desc, username

-- count * 查询总条数
select count(*) from my_db_01.users where id > 11
-- as 给列取别名
select count(*) as total from my_db_01.users where id > 11

```

### 在项目中使用 mysql

#### 1.安装

```js
npm i mysql
```

#### 2.配置

```js
const mysql = require("mysql");

// 建立与数据库的连接关系
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的ip地址 (本机:127.0.0.1)
  user: "root", // 登陆数据库的账号
  password: "密码", // 登陆数据库的密码
  database: "my_db_01", // 要操作的数据库名称
});
```

#### 3.测试是否正常

```js
db.query("SELECT 1", (err, result) => {
  if (err) throw err;
  console.log(result);
});
// 成功后会打印 request: [ RowDataPacket { '1': 1 } ]
```

#### 4.使用查询语句

```js
db.query("select * from my_db_01.users", (err, request) => {
  if (err) throw err;
  console.log(request);
});
```

#### 5.插入数据

```js
// 使用?展位符号
const sql = "insert into my_db_01.users (username, password) values (?, ?)";
const obj = {
  username: "王小二",
  password: "123123",
};
db.query(sql, [obj.username, obj.password], (err, request) => {
  if (err) throw err;
  console.log("🚀 ~ file: 01-dome.js:28 ~ db.query ~ request:", request);
  if (request.affectedRows === 1) {
    console.log("插入数据成功");
  }
});
```

```js
// 快捷插入

const sql = "insert into my_db_01.users set ?";
const obj = {
  username: "yyy",
  password: "123",
};

db.query(sql, obj, (err, request) => {
  if (err) throw err;
  if (request.affectedRows === 1) {
    console.log("插入数据成功");
  }
});
```

#### 6.更新数据

```js
const sql = "update my_db_01.users set username=?, password=? where id=?";
const obj = {
  id: 11,
  username: "小王",
  password: "9990",
};

db.query(sql, [obj.username, obj.password, obj.id], (err, request) => {
  if (err) throw err;
  if (request.affectedRows === 1) {
    console.log("更新数据成功");
  }
});
```

```js
// 快捷更新
const sql = "update my_db_01.users set ? where id=?";
const obj = {
  id: 11,
  username: "小王",
  password: "9990",
};

db.query(sql, [obj, obj.id], (err, request) => {
  if (err) throw err;
  if (request.affectedRows === 1) {
    console.log("更新数据成功");
  }
});
```

#### 7.删除语句

```js
const sql = "delete from my_db_01.users where id=?";

db.query(sql, 16, (err, request) => {
  if (err) throw err;
  if (request.affectedRows === 1) {
    console.log("删除成功");
  }
});
```

### session身份认证

1.安装
```js
npm install express-session
```

JWT
```js
npm install jsonwebtoken express-jwt
```
- jsonwebtoken 用于生成jwt字符串
- express-jwt 用于将jwt解析还原成对象
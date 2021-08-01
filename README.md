项目

## KOA简介

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616102550011.png" alt="image-20210616102550011" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616102912577.png" alt="image-20210616102912577" style="zoom:50%;" />

- KOA过于精简，不进行二次开发无法使用，但也因此得益于精简，能够更自由的定制化 

## 微信开发者id

`https://mp.weixin.qq.com/`

`文档：https://developers.weixin.qq.com/miniprogram/dev/framework/`

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622155006474.png" alt="image-20210622155006474" style="zoom:50%;" />

> | AppID(小程序ID)wxd18c5c5a5fb4c85a                     |      |
> | ----------------------------------------------------- | ---- |
> | AppSecret(小程序密钥)304f1bd86c845a12d3111bc8643a41fc |      |

## 项目每一步教程





# KOA基础

1、解释

访问服务器，服务器通过中间件反馈

2、注册(可多个)

```js
const Koa = require('koa')
const app = new Koa();

function test(){
    xxx
}
app.use(test);
app.use(()=>{
    xxx
})
```

3、上下文

```js
app.use((ctx,next)=>{
    console.log('xxx');
    next()
})
app.use((ctx,next)=>{
    console.log('yyy');
})

//'xxx'
//'yyy'
```

## 洋葱模型

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616215407498.png" alt="image-20210616215407498" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616215431892.png" alt="image-20210616215431892" style="zoom:50%;" />

```js
//输出结果1342
```

## 深入理解async await

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616215957265.png" alt="image-20210616215957265" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616223710461.png" alt="image-20210616223710461" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616224921130.png" alt="image-20210616224921130" style="zoom:50%;" />

中间件为什么加async，因为内部用了await





为什么要保证洋葱模型

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616225859975.png" alt="image-20210616225859975" style="zoom:50%;" />

中间件互相传值

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616230446900.png" alt="image-20210616230446900" style="zoom:50%;" />

## KOA-router

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210616231637619.png" alt="image-20210616231637619" style="zoom:50%;" />

CRUD:

C:	router.post

R:	router.get

U:	router.put

D:	router.delete

## 服务器编程

### 主题划分-划分router

如何划分主题？

渐进式：找到核心的主题（抽象概念->思考主题和子主题->确定model

## 划分router

1、兼容多版本，开闭原则

2、循环引用**（难点）**

![image-20210617164735644](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617164735644.png)

解决方法：在子模块内每个部分都建立新的router，并导出，在上层模块中

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617165224801.png" alt="image-20210617165224801" style="zoom:50%;" />



## 自动注册router

1、自动app.use

2、自动require v1下的路由模块

### require-directory

两个方法

1、<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617171813947.png" alt="image-20210617171813947" style="zoom:50%;" />

2、**推荐！！**

注意花括号{}

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617171658724.png" alt="image-20210617171658724" style="zoom:50%;" />



## 初始化管理器

为什么需要？

不可能所有配置都放在app.js里面

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617180625937.png" alt="image-20210617180625937" style="zoom:50%;" />

路径问题怎么解决？？

1、让用户通过package.json配置

2、通过process.cwd（） =>输出当前文件夹路径

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617181157297.png" alt="image-20210617181157297" style="zoom:50%;" />



## 参数获取与LinValidator校验器

`文档：https://doc.cms.talelin.com/server/koa/validator.html`

传参方式

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617181726649.png" alt="image-20210617181726649" style="zoom:50%;" />

1、浏览器url只能发送get请求，不能发送post	



- postman模拟

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617213220156.png" alt="image-20210617213220156" style="zoom:50%;" />

- 服务器接收

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617213419061.png" alt="image-20210617213419061" style="zoom:50%;" />

问题1：用户输入不合法、必须传的值、账号要符合某种规范，如何校验？

①防止非法参数

②给用户明确提示

研究linValidator



## LinValidator使用教程

1. 复制源码
2. 新建校验类



### 校验器优势？

#### Rule

-  三个参数

- id数组校验可以定义多个规则，且关系（注意：或关系需要自定义）

- 使用this加super 
- 注意错误点：拼写错误（双击查看）、文件未保存未生效（文件右边显示白色小圆）

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619202717783.png" alt="image-20210619202717783" style="zoom:50%;" />



### 校验器参数获取

> lin_Validator依赖的库loadash

`loadash：https://www.lodashjs.com/`

`validator.js：https://github.com/validatorjs/validator.js`



# 用户系统

## 数据库

关系型/非关系型

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620092225603.png" alt="image-20210620092225603" style="zoom:50%;" />



## Navicat 出现1054

Navicat 点击用户 出现1054 Unknown column 'password_lifetime' in 'field list'

> 因为通过xampp安装较新的版本，通过XAMPP安装MySQL的是MariaDB，而后者没有password_lifetime，取而代之的是password_expired。在navicat的新建连接选择MariaDB即可解决这个问题。
>
> 拓展链接：MariaDB百度百科 https://baike.baidu.com/item/mariaDB/6466119?fr=aladdin
>
> http://www.sohu.com/a/252174706_355140



## Sequelize

`官网：https://www.sequelize.com.cn/`

1. npm安装 包括安装mysql

   <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620102307148.png" alt="image-20210620102307148" style="zoom:50%;" />

2. 配置文件

   <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620221618894.png" alt="image-20210620221618894" style="zoom:50%;" />

   3. <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620221640265.png" alt="image-20210620221640265" style="zoom:50%;" />



## Model

### user

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620222931515.png" alt="image-20210620222931515" style="zoom:50%;" />

源码和现在代码区别：看公众号---面向对象

#### 连接数据库---五个错误：

- Dialect needs to be explicitly supplied as of v4.0.0

  ```js
  const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  });
  ```

- No Sequelize instance passed

  ```js
  User.init({
      id: {
          type: Sequelize.STRING,
          primaryKey: true,
          autoIncrement: true
      },
      nickname: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      openid: {
          type: Sequelize.STRING,
          unique: Sequelize.STRING
      }
  }, {
      sequelize
  })
  
  //记得加入 { sequelize }
  ```

- No database selected

  dbName别写错了

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620232152976.png" alt="image-20210620232152976" style="zoom:50%;" />

- 数据库名字别写错

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620231520326.png" alt="image-20210620231520326" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620232455166.png" alt="image-20210620232455166" style="zoom:50%;" />

- Incorrect column specifier for column 'id'

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620232523824.png" alt="image-20210620232523824" style="zoom:50%;" />

#### 数据表优化

- 表名

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621074933590.png" alt="image-20210621074933590" style="zoom:50%;" />

- 下划线组合单词

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621074820259.png" alt="image-20210621074820259" style="zoom:50%;" />

- 后期修改数据表

  - 新增字段
    - <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621073910544.png" alt="image-20210621073910544" style="zoom:50%;" />
    - 或者手动删除，再重启动

- 不要表里自动生成s的CreateAt,UpdateAt（注意要删除表重启动）

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621074222127.png" alt="image-20210621074222127" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621074511827.png" alt="image-20210621074511827" style="zoom:50%;" />

- 数据迁移

  - 有风险：：：参见官网

#### API

- 思路：

  - 确定字段nickname password1 password2 email

  - 编写校验器

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621093750801.png" alt="image-20210621093750801" style="zoom:50%;" />

  - 修改全局异常归类

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621093819490.png" alt="image-20210621093819490" style="zoom:50%;" />

  - 编写API（这里不用注册，因为之前写了自动注册，但是注意导出router

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621093933820.png" alt="image-20210621093933820" style="zoom:50%;" />

#### 将数据保存到数据库CRUD

- 数据库‘增’：在user内引入Model-user（email保持唯一性）（可以吧之前app.js的require user删除）

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621105845225.png" alt="image-20210621105845225" style="zoom:50%;" />

- 处理email重复，validator自定义函数，findone是异步操作

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621134248731.png" alt="image-20210621134248731" style="zoom:50%;" />

- validator引入v2版本lin-validator

- 修正所有validator实例化，加上await，相应的，所在函数都要加上async

- 注意validator实例化必须位于第一行，不然起不到守门员作用

- 为什么不把validator当中间件，这样根据洋葱模型，就不必写await这种方式？

  - 因为如果当中间件，只会在项目启动实例化一个，而每个请求都会修改这个实例化的属性，会产生错乱，因此不要轻易以类来组织中间件

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621110520903.png" alt="image-20210621110520903" style="zoom:50%;" />



#### 盐与加密

`how bcryptjs works:https://javascript.plainenglish.io/how-bcryptjs-works-90ef4cb85bf4`

- <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621113001198.png" alt="image-20210621113001198" style="zoom:50%;" />

- set简化代码
  - <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621114138004.png" alt="image-20210621114138004" style="zoom:50%;" />

#### 成功反馈

- 成功exception

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621134841006.png" alt="image-20210621134841006" style="zoom:50%;" />

- 帮助类

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621134804369.png" alt="image-20210621134804369" style="zoom:50%;" />



#### 校验

> session token 无状态 （不考虑状态）
>
> <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621140930746.png" alt="image-20210621140930746" style="zoom:50%;" />

- 编写token api

  - 模拟枚举

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621145646476.png" alt="image-20210621145646476" style="zoom:50%;" />

- secret 

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621141458973.png" alt="image-20210621141458973" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621145742659.png" alt="image-20210621145742659" style="zoom:50%;" />

- 坑点
  - api一定要导出`module.exports = router`
  - super()一定要加
  - 实例化`const v = await new tokenValidator().validate(ctx)`一定加await
  - api传参一定不要拼写错误
  - api传参，key一定是双引号“”，value可以为字符串“”，也可以为数字
  - 在validator的方法中vals.body.type一定不要忘写body
  - 一定一定注意：导入导出{}的问题
  - 一定一定注意promise前面加await，如squelize的sql：findOne函数，validator函数等等



#### 验证账户密码

1. 确定type

   <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621165524207.png" alt="image-20210621165524207" style="zoom:50%;" />

2. 编写邮箱验证方法

   <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621165615454.png" alt="image-20210621165615454" style="zoom:50%;" />

3. 补充http异常捕获

   <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621165739891.png" alt="image-20210621165739891" style="zoom:50%;" />

4. 在User-model中编写验证方法

   <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210621165648898.png" alt="image-20210621165648898" style="zoom:50%;" />

#### 生成jwt令牌（jsonwebtoken）

- 编写jwt工具类，用于生成token

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622090527269.png" alt="image-20210622090527269" style="zoom:50%;" />

- 在token api使用

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622090606309.png" alt="image-20210622090606309" style="zoom:50%;" />

#### httpBasicAuth

- 不是所有的访问都是公开的，因此需要权限验证

- 编写验证中间件

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622093206815.png" alt="image-20210622093206815" style="zoom:50%;" />

- 利用洋葱模型特性，在访问api中加入

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622093246899.png" alt="image-20210622093246899" style="zoom:50%;" />

- 注意：

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622093436267.png" alt="image-20210622093436267" style="zoom:50%;" />

#### 验证令牌

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622101035406.png" alt="image-20210622101035406" style="zoom:50%;" />

#### API分级

- 设置枚举等级

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622103946282.png" alt="image-20210622103946282" style="zoom:50%;" />

- 守门员设置等级

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622104015257.png" alt="image-20210622104015257" style="zoom:50%;" />

- 等级验证

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622104108561.png" alt="image-20210622104108561" style="zoom:50%;" />

#### 微信登录

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622110848189.png" alt="image-20210622110848189" style="zoom:50%;" />



#### openid和unionid

- 建立微信登录逻辑处理模块
- 用户提供code获取token
  - 访问微信登录api
  - 判断返回状态码
  - 在数据库中确定是否有用户存在，不存在注册
  - 生成token返回
  - <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210622164911321.png" alt="image-20210622164911321" style="zoom:50%;" />
  - 在token的api中进行switch判断





# 微信测试工具

> **LIN UI**
>
> `https://doc.mini.talelin.com/start/`

## 测试工具使用：

- 微信开发者工具下载

- npm init

- npm i lin-ui@0.4.0

- 构建npm

- 注册组件

- 编写wxml

- 编写JS（验证API，storage储存token）

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623095449780.png" alt="image-20210623095449780" style="zoom:50%;" />

  

- 编写测试接口

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623095500676.png" alt="image-20210623095500676" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623095711719.png" alt="image-20210623095711719" style="zoom:50%;" />











# 旧岛---业务开发

## 如何制表

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623103155110.png" alt="image-20210623103155110" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623103504996.png" alt="image-20210623103504996" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623103519404.png" alt="image-20210623103519404" style="zoom:50%;" />



- 表与表之间的关联

## 制表classic-Movie、Sentence、Music

- 编写模型，导入sql

- 编写接口

  业务模型

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623195831831.png" alt="image-20210623195831831" style="zoom:50%;" />

  flow模型

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623195932675.png" alt="image-20210623195932675" style="zoom:50%;" />

## 测试latest接口

- 编写小程序测试验证(携带令牌，加密令牌)

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623200145858.png" alt="image-20210623200145858" style="zoom:50%;" />

- 编写接口

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623200435620.png" alt="image-20210623200435620" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623200333351.png" alt="image-20210623200333351" style="zoom:50%;" />

- 序列化反序列化 （为什么KOA能解析Art的dataValues)

  > 某一种语言转化为JSON

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210623200718519.png" alt="image-20210623200718519" style="zoom:50%;" />

## Favor业务（数据库事务）

- 建立Favor模型

- 添加like和dislike方法（同时处理添加记录和fav_nums改变 ）

- 利用数据库事务保证数据一致性ACID特性：原子性、一致性、隔离性、持久性

  ![image-20210624102512032](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624102512032.png)
  
  ![image-20210624103111073](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624103111073.png)
  
- validator （这里的id校验后面改别名）

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624100003048.png" alt="image-20210624100003048" style="zoom:50%;" />

- api

  ![image-20210624102206438](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624102206438.png)

  cancel api类比上面

- 增加返回数据的属性（index和like_status)----likeLatest

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624104820100.png" alt="image-20210624104820100" style="zoom:50%;" />
  
- dislike

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210626220400189.png" alt="image-20210626220400189" style="zoom:50%;" />

- 错误总结：

  - wx调试openid做成了静态

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210626213953911.png" alt="image-20210626213953911" style="zoom:50%;" />

  - 如果一个class不能正常使用考虑一下几个情况

    - 单词拼写错误
    - 导入未加{}
    - 未导出
    - 未实例化不能正常使用



> JS语言局限性：动态语言约束太少，可能导致维护/修改部分代码的时候，编译没问题，上线出问题，多做单元测试

## 



## 排除字段

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624161750738.png" alt="image-20210624161750738" style="zoom:50%;" />

1、直接删

2、查询不查

- <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624162509032.png" alt="image-20210624162509032" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210626215221530.png" alt="image-20210626215221530" style="zoom:50%;" />

- 采用：

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624162523343.png" alt="image-20210624162523343" style="zoom:50%;" />

- bug（已修复）

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624162904816.png" alt="image-20210624162904816" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624162917672.png" alt="image-20210624162917672" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624162928423.png" alt="image-20210624162928423" style="zoom:50%;" />

3、该字段序列化不做





## 当前期的下一期/上一期

下一期

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210624163804688.png" alt="image-20210624163804688" style="zoom:50%;" />



## 获取期刊点赞

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210625181403615.png" alt="image-20210625181403615" style="zoom:50%;" />

- validator

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210625181451772.png" alt="image-20210625181451772" style="zoom:50%;" />

- 改进（函数不能保存变量，类可以）

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210625183832013.png" alt="image-20210625183832013" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210625183853035.png" alt="image-20210625183853035" style="zoom:67%;" />

- 方法2：改为两个type

## 查询用户喜欢的所有期刊

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627151713801.png" alt="image-20210627151713801" style="zoom:50%;" />

## 如何避免不适用for，循环查询数据库



<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627151536270.png" alt="image-20210627151536270" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627151553840.png" alt="image-20210627151553840" style="zoom:50%;" />



<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627151729714.png" alt="image-20210627151729714" style="zoom:50%;" />





## 思考重构

- 封装函数思考
  - 参考art函数封装，非常值得学习，一般复用3次及以上，进行封装
  - 参考checkType封装class

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627152145331.png" alt="image-20210627152145331" style="zoom:50%;" />

- 代码重构

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627153155926.png" alt="image-20210627153155926" style="zoom:50%;" />

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627153618301.png" alt="image-20210627153618301" style="zoom:50%;" />



## 坑！循环导入

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627154059804.png" alt="image-20210627154059804" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627154110424.png" alt="image-20210627154110424" style="zoom:50%;" />

- 解决方法：

  移入模块内导入



## 热门图书

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627215216719.png" alt="image-20210627215216719" style="zoom:50%;" />

## nodeJS高并发，单线程

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210627220557687.png" alt="image-20210627220557687" style="zoom:50%;" />

## group分组

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628101911553.png" alt="image-20210628101911553" style="zoom:50%;" /> 

![image-20210628102018916](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628102018916.png)

## 图书详情



http://t.talelin.com/v2/book/id/%s 

![image-20210628104011120](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628104011120.png)

![image-20210628104016167](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628104016167.png)

![image-20210628104020314](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628104020314.png)

- 注意config要配置



## 图书搜索

- 校验器

  ![image-20210628150044446](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628150044446.png)

- 编写搜索方法（query取 查询参数，body去body里的参数）

  ![image-20210628150101647](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628150101647.png)

- 小程序查询

  ![image-20210628150105758](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628150105758.png)

## 书记点赞

- 搜索方法

  ![image-20210628151815840](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628151815840.png)

- api

  ![image-20210628151826123](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628151826123.png)

## 我喜欢的数据数量

- 搜索方法

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628152142521.png" alt="image-20210628152142521" style="zoom:67%;" />

- api

  ![image-20210628152149973](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628152149973.png)

## 新增短评

- 校验器

  ![image-20210628153257990](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628153257990.png)

- 模型及方法

  - 建模

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628152623980.png" alt="image-20210628152623980" style="zoom:50%;" />

  - 方法

    ![image-20210628153305914](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628153305914.png)

- api

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628153356771.png" alt="image-20210628153356771" style="zoom:50%;" />

- 小程序测试

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628153328328.png" alt="image-20210628153328328" style="zoom:50%;" />

## 获取短评

- 校验器

  

- 方法

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628153640448.png" alt="image-20210628153640448" style="zoom:50%;" />

- api

  ![image-20210628153655592](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628153655592.png)

## 热搜模拟

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628153826895.png" alt="image-20210628153826895" style="zoom:50%;" />





# 前后端对接

## 坑坑坑，Model中禁止使用构造函数

## 静态资源配置

- 配置koa-static静态资源

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629193931075.png" alt="image-20210629193931075" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629194357516.png" alt="image-20210629194357516" style="zoom:50%;" />

- 程序调用静态资源

  - 方案1：修改返回数据的url

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629201252465.png" alt="image-20210629201252465" style="zoom:50%;" />

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629201317858.png" alt="image-20210629201317858" style="zoom:43%;" />

  - 问题：麻烦，拼接过于粗暴

- 方案2：在Model中修改（和toJSON冲突，无法修改）

  - 修改image模型

    ![image-20210629201925674](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629201925674.png)

  - <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629202013196.png" alt="image-20210629202013196" style="zoom:50%;" />

  - dataValues不受get方法影响

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629202044863.png" alt="image-20210629202044863" style="zoom:50%;" />

- 方案3：

  - 在toJSON遍历属性

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629202725862.png" alt="image-20210629202725862" style="zoom:50%;" />



### 静态资源存储方案

- 静态资源存储方式1、2、3、4
- 静态资源不单单指图片，也可以是js、css、html等（不适用于nuxt，因为他是动态，ssr，相当于服务端渲染）
- vue/react好，但更多用于H5、webAPP、CMS等不太需要SEO的网站
- 服务端渲染好处是适合SEO

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629204043841.png" alt="image-20210629204043841" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629204342331.png" alt="image-20210629204342331" style="zoom:60%;" />



## 无感知刷新令牌

- 注意无感知单令牌刷新有一个前提，就是微信小程序无需账号密码

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629210130623.png" alt="image-20210629210130623" style="zoom:67%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629210206891.png" alt="image-20210629210206891" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629210302714.png" alt="image-20210629210302714" style="zoom:50%;" />

- 如果是web这种，就需要双令牌

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629210548705.png" alt="image-20210629210548705" style="zoom:70%;" />



















































# 其他



## vscode调试

断点+f5



## nodemon自动重启服务器

`安装：npm i nodemon -g`

`使用：nodemon app.js`



1、为什么-g

因为局部安装，要使用nodemon必须使用npx nodemon

2、package.json设置npm脚本命令

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617170107977.png" alt="image-20210617170107977" style="zoom:50%;" />

3、既要nodemon又要断点调试

vscode配置文件

![image-20210617170359534](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617170359534.png)

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617170436838.png" alt="image-20210617170436838" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617170656067.png" alt="image-20210617170656067" style="zoom:50%;" />

添加当前文件调试

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617170731908.png" alt="image-20210617170731908" style="zoom:50%;" />

添加nodemon调试

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210617170831090.png" alt="image-20210617170831090" style="zoom:50%;" />





## 异常处理

`推荐书籍：代码大全`

JavaScript语言问题：1/0 = Infinity

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210618111005302.png" alt="image-20210618111005302" style="zoom:50%;" />

### 链式异常

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210618111235514.png" alt="image-20210618111235514" style="zoom:50%;" />

### 为什么处理异常？

1.给用户提示

2.给别的开发者提示



### 如何处理异常？

1. 第三方库要trycatch

2. 全局异常，这样可以保证不用每个部分都trycatch

3. 异步编程无法被try catch捕捉

   <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210618113643896.png" alt="image-20210618113643896" style="zoom:50%;" />

### 全局异常处理

- AOP面向切面编程

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210618175944184.png" alt="image-20210618175944184" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210618181041959.png" alt="image-20210618181041959" style="zoom:50%;" />

### 如何反馈异常

- 不是所有异常信息都要返回到客户端
  - 如堆栈调用信息不该返回，尽量返回清晰明了信息
- 反馈分类
  - HTTP status code 2xx 4xx 5xx
  - message 详细描述异常内容，搭配error_code使用
  - error_code 比HTTP status code更详细的错误码
  - request_url 返回当前访问接口
- 错误分类
  - 已知错误
    - 如非法输入（校验器可以检查）
    - try catch捕捉错误
  - 未知错误
    - 输入密码错误



### 定义已知异常返回格式

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619114232951.png" alt="image-20210619114232951" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619114213276.png" alt="image-20210619114213276" style="zoom:50%;" />

**优化异常格式写法**

- 新建HttpException继承Error

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619115050334.png" alt="image-20210619115050334" style="zoom:50%;" />

- 简化error实例化写法

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619114858802.png" alt="image-20210619114858802" style="zoom:50%;" />

- 修改全局异常处理

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619115235078.png" alt="image-20210619115235078" style="zoom:50%;" />

**特定全局异常类**

在原有基类基础上再进行详细化处理

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619131352650.png" alt="image-20210619131352650" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619131437955.png" alt="image-20210619131437955" style="zoom:50%;" />

**如何避免每次异常类的导入-global**

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619131753193.png" alt="image-20210619131753193" style="zoom:50%;" />

- 使用方法

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619131858621.png" alt="image-20210619131858621" style="zoom:50%;" />

缺点：如果单词拼写错误代码可能不报错，但会无法访问服务器接口，容易无法找到问题所在

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619132157905.png" alt="image-20210619132157905" style="zoom:40%;" />

因此尽量**该导入的时候导入**

### 定义未知异常返回格式

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210619201641846.png" alt="image-20210619201641846" style="zoom:50%;" />



配置文件与终端显示异常

- super没有未报错
- 在exception抛出

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620085442707.png" alt="image-20210620085442707" style="zoom:50%;" />





- 开发环境dev
- 生产环境prod
  - 增加配置文件
  - 导入全局变量
  - 在全局异常捕获中修改

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620085508534.png" alt="image-20210620085508534" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620090150283.png" alt="image-20210620090150283" style="zoom:50%;" />

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210620090214918.png" alt="image-20210620090214918" style="zoom:50%;" />

## require别名

package.json

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210625164458221.png" alt="image-20210625164458221" style="zoom:50%;" />

![image-20210629131211533](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629131211533.png)

- app.js注册

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210629131243295.png" alt="image-20210629131243295" style="zoom:50%;" />

## 浅谈中间层和微服务

如何评价淘宝 UED 的 Midway Framework 前后端分离？：https://www.zhihu.com/question/23512853/answer/27516134

微服务解决问题：

- 理清架构，并非和访问量有绝对挂钩
- 提高扩容



中间层

- 为了业务

  <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628144409403.png" alt="image-20210628144409403" style="zoom:50%;" />

## 爬虫

https://www.bilibili.com/video/BV1YJ411S7Aw?from=search&seid=2078835576685850527

## 序列化

![image-20210628162559926](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628162559926.png)

- 方法2

  直接给Model添加toJSON字段

![image-20210628163023476](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628163023476.png)

- 方法3

  - 模型利用exclude，灵活排除字段

    <img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628163926216.png" alt="image-20210628163926216" style="zoom:50%;" />

  - ![image-20210628164003254](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628164003254.png)

## Model模型不要加constructor

![image-20210628164721014](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628164721014.png)

否则在后续查询中，只能查到有默认值的数值

![image-20210628164756676](C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210628164756676.png)





## 部署

<img src="C:\Users\Skinner\AppData\Roaming\Typora\typora-user-images\image-20210701152201557.png" alt="image-20210701152201557" style="zoom:67%;" />
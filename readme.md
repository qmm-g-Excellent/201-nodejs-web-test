# 基于 express + mongoose 的api 练习

## 运行方式
1. 检查 config/default.json 中参数配置是否正确
2. 在命令行中执行如下命令
   ```bash
   npm start
   ```

3. 在浏览器中测试 http://localhost:3000
4. 在浏览器中测试 http://localhost:3000/items 


## 练习要求

**重要：本题包含四个篇目：基础，进阶，提高，出栈，做完一个篇目后，需要到 https://jinshuju.net/f/27Zpwx 提交做题记录**

### 基础篇
1. 创建model: item 完成下列接口

   ```
   GET /items # 获取全部item
   GET /items/:itemId	# 获取一个item
   POST /items #增加一个item
   DELETE /items/:itemId# 删除一个item
   PUT /items/:itemId	# 更新一个item
   ```

2. 创建Model: category，category 与 item 为一对多关系，并参照上面完成相应接口
 
 ```
 GET categories/  #获取全部category
 GET categories/:categoryId  #获取一个category
 POST categories/  #增加一个category
 DELETE  categories/:categoryId  #删除一个category
 PUT categories/:categoryId   #更新一个category
```

3. 创建Model: cart，cart 与 item 为多对多关系，并参照上面完成相应接口

 ```
    GET carts/    #获取所有的cart
    GET  carts/:cartId   #获取一个cart
    POST carts/    #增加一个cart
    PUT  carts/:cartId  #修改一个cart
    DELETE carts/:cartId  #删除一个cart
   
 ```


### 进阶篇
1. 自己编写刷数据库脚本创建上述数据库，并完成功能
2. 用 supertest + mocha 完成上述接口的集成测试
3. 用 inspector 调试功能解决问题

### 提升篇
1. 创建Model: user, 可以实现用户的注册和登录功能,user和cart是一对一的关系

2. 写一个中间件,实现如下功能
   ```
   - 没有登录的用户只能访问 GET 类型接口
   - 登录的用户可以访问所有接口
   - 用户只能访问自己的 cart
   ```

3. 从一个空库开始完成上述过程

4. 提出一个合理需求，要求用到 discriminator/populate/unwind，并完成之

### 出栈篇
待定。。。

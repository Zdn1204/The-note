//1，引入express
const { request, response } = require('express');
const express = require('express');

//2，创建应用对象
const app = express();

//3，创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
app.get('/server',(request,response)=>{
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    response.send('Hello Ajax -2');
});
//all 可以接受任意类型的请求
app.all('/json-server',(request,response)=>{
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers','*');
    //响应一个数据
    const data = {
        name:'zdn'
    };
    //将对象转换为字符串
    let str = JSON.stringify(data);
    //设置响应体
    response.send(str);
});

//针对IE缓存
app.get('/ie',(request,response)=>{
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    response.send('Hello IE-3');
});

app.get('/delay',(request,response)=>{
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    setTimeout(()=>{
        //设置响应体
        response.send('延时响应');
    },3000)
});

//Axios服务
app.all('/axios-server',(request,response)=>{
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    const data = {name:'zdn'};
    response.send(JSON.stringify(data));
});
//fetch服务
app.all('/fetch-server',(request,response)=>{
    //设置响应头   设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    const data = {name:'zdn'};
    response.send(JSON.stringify(data));
});


//jsonp服务
app.all('/jsonp-server',(request,response)=>{
    // response.send('console.log("hello jsonp-server")');
    const data = {
        name:'ggodna'
    };

    //将数据转化为字符串
    let str = JSON.stringify(data);
    //返回结果
    response.end(`handle(${str})`);
});

//用户名检测是否存在
app.all('/check-username',(request,response)=>{
    // response.send('console.log("hello jsonp-server")');
    const data = {
        exist:1,
        msg:'用户名存在',
    };

    //将数据转化为字符串
    let str = JSON.stringify(data);
    //返回结果

    //以下三种写法等同

    // response.end('handle('+str+')');

    // response.end(`handle({"exist":1,"msg":"用户名存在"})`);

    response.end(`handle(${str})`);
    
});

app.all('/cors-server',(request,response) => {
    //设置响应头，解决跨域问题
    response.setHeader('Access-Control-Allow-Origin',"*");

    response.send('hello CORS');
})


//4，监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000 端口监听中。。。');
})
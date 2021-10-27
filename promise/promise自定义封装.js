
class Promise{
    //构造方法
    constructor(executor){
        //添加属性
        this.PromiseState = 'pending';
        this.PromiseRresult = null;

        this.callbacks = [];
        //保存实例对象的this值
        const self = this;
        //resolve函数
        function resolve(data){
            if(self.PromiseState !== 'pending') return;
            //1，修改对象的状态(promiseState)
            self.PromiseState = 'fulfilled';
            //2，设置对象结果值(promiseRresult)
            self.PromiseRresult = data;
            //异步调用成功的回调函数
            setTimeout(()=>{
                self.callbacks.forEach(item => {
                    item.onResolved(data);
                })
            })
        };
        //reject函数
        function reject(data){
            if(self.PromiseState !== 'pending') return;
            //1，修改对象的状态(promiseState)
            self.PromiseState = 'rejected';
            //2，设置对象结果值(promiseRresult)
            self.PromiseRresult = data;

            //异步调用失败的回调函数
            setTimeout(()=>{
                self.callbacks.forEach(item => {
                    item.onRejected(data);
                })   
            })
        };

        try{
        //同步调用（执行器函数）
        executor(resolve,reject);
        }catch(e){
            //修改promise对象状态为“失败”
            reject(e);
        }
    }

    //then方法
    then(onResolved,onRejected){
        const self = this;
        //判断回调函数参数
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason;
            }
        }
        if(typeof onResolved !== 'function'){
            onResolved = value => value;
        }
        return new Promise((resolve,reject) => {
            //封装函数
            function callbacks(type){
                try{
                    //获取回调函数的执行结果
                    let result = type(self.PromiseRresult);
                    //判断
                    if(result instanceof promise){
                        //如果是promise对象
                        result.then(v=>{
                            resolve(v);
                        },r=>{
                            reject(r);
                        })
                    }else{
                        //结果的对象状态为成功
                        resolve(result);
                    }
                }catch(e){
                    reject(e);
                }
            }
    
            //调用回调函数
            if(this.PromiseState === 'fulfilled'){
                setTimeout(()=>{
                    callback(onResolved);
                })
               
            }
    
            if(this.PromiseState === 'rejected'){
                setTimeout(()=>{
                    callback(onRjected);
                })
    
            }
    
            //判断pending状态
            if(this.PromiseState === 'pending'){
                //保存回调函数
                this.callbacks.push({
                    onResolved:function(){
                       callback(onResolved);
                    },
                    onRjected:function(){
                        callback(onRejected);
                    }
                })
            }
        })
    }

    //catch方法
    catch(onRejected){
        return this.then(undefined,onRejected);
    }

    //resolve方法
    static resolve(value){
        //返回promise对象
        return new Promise((resolve,reject)=>{
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v);
                },r=>{
                    reject(r);
                })
            }else{
                //设置状态为成功
                resolve(value);
            }
        })
    }

    //reject方法
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason);
        })
    }

    static all(promises){
        //返回结果为promise对象
        return new Promise((resolve,reject)=>{
            //遍历
            for(let i = 0; i<promises.length; i++){
                //
                promises[i].then(v=>{
                    //得知对象的状态是成功的
                    //每个promise对象都成功
                    count++;
                    //将当前promise对象成功的结果，存入到数组中
                    arr[i] = v;
                    if(count === promises.length){
                        //修改状态
                        resolve(arr);
                    }
                },r=>{
                    reject(r);
                })
            }
        })
    
    }
    
    static race(promises){
        return new Promise((resolve,reject)=>{
            for(let i=0; i<promises.length; i++){
                promises[i].then(v=>{
                    //修改返回对象的状态
                    resolve(v);
                },r=>{
                    reject(r);
                })
            }
        })
    }
    
}







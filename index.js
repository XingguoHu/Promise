class Promise{
    constructor(executor) {//executor 执行器函数
        this.status = 'pending';
        this.value = null;
        this.rejectReson = null;
        this.onFulfilledCallBack = null;
        this.onRejectedCallBack = null;
        this.reject = this.reject.bind(this);
        this.resolve = this.resolve.bind(this);
        this.then = this.then.bind(this);
        this.catch = this.catch.bind(this);
        try{

            executor(this.resolve, this.reject);
        }catch(e){
            this.reject(e);
        }
    }
    /*@parmas value anyType
    ** return null
    */
    resolve(value) {
        //保证在pending状态时,在push callback之后调用
        setTimeout(_ => {
          if(this.status === 'pending'){
                this.status = 'resolved';
                this.value = value;
                if(this.onFulfilledCallBack && Object.prototype.toString.call(this.onFulfilledCallBack) === '[object Function]'){
                    this.onFulfilledCallBack(this.value);
                }
            }
        });        
    }
    /*
    **@parmas rejectReson anyType
    **return null
    */
    reject(rejectReson) {
        setTimeout(_ => {
            if(this.status === 'pending'){
                this.status = 'rejected';
                this.rejectReson = rejectReson;
                if (this.onRejectedCallBack && Object.prototype.toString.call(this.onRejectedCallBack) === '[object Function]') {
                    this.onRejectedCallBack(this.rejectReson);
                }
            }
        });
    }
    /*
    **@params onFullfilled function
    **@params onRejected function
    **return promise
    */
    then(onFulfilled, onRejected){
        const _this = this;
        return new Promise(function(resolve, reject){
            //异步操作已经完成，直接调用
            if (_this.status === 'resolved') {
                try{
                    resolve(onFulfilled(value));
                }catch(e){
                    reject(e);
                }
            }
            if (_this.status === 'rejected') {
                try{
                    reject(onRejected(_this.rejectReson));
                }catch(e){
                    reject(e);
                }
            }
            //未完成异步,等待回调
            if(_this.status === 'pending'){
                _this.onFulfilledCallBack = onFulfilled ? (value => {
                    try{
                        resolve(onFulfilled(value));
                    }catch(e){
                        reject(e);
                    }
                  
                }) : null;
                _this.onRejectedCallBack= (reson => {
                    if(onRejected){
                        try{
                            reject(onRejected(reson) || _this.rejectReson);
                        }catch(e){
                            reject(e);
                        }
                    }else{
                        reject(_this.rejectReson)
                    }
                });
            }
        });
    }
    /*@params onFulfilled function
    **return promise
    */
    catch(onFulfilled){
        return this.then(null, onFulfilled);
    }
    /*@params value anyType
    **return promise
    */
    static resolve(value){
        return new Promise(function (resolve, reject){
            resolve(value);
        })
    }
    /*@params value anyType
    **return promise
    */
    static reject(value){
        return new Promise(function (resolve, reject) {
            reject(value);
        })
    };
    /*@params promises array[promise]
    **return promise
    */
    static all(promises){
        return new Promise(function (resolve, reject){
            let result = [];
            let i = 0;
            function pushResult(index, value){
                result[index] = value;
                i++;
                if(i === promises.length){
                    resolve(result);
                }
            }
            promises.forEach((promise, index) => {
                promise.then(value =>{
                    pushResult(index, value);
                }).catch(e => {
                    reject(e);
                })
            });
        })
    }
    /*@params promises array[promise]
    **return promise
    */
    static race(promises){
        return new Promise(function (resolve, reject) {
            promises.forEach(promise => {
                promise.then(value => {
                    resolve(value);
                }).catch(e => {
                    reject(e);
                })
            });
        })
    }

}

if (typeof window !== 'undefined') {
    window.Promise = Promise;
}
if (typeof global !== 'undefined') {
    global.Promise = Promise;
}



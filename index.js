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
                resolve(onFulfilled(_this.value));
            }
            if (_this.status === 'rejected') {
                reject(onRejected(_this.value));
            }
            //未完成异步,等待回调
            if(_this.status === 'pending'){
                _this.onFulfilledCallBack = (value => {
                    resolve(onFulfilled(value));
                });
                _this.onRejectedCallBack= (reson => {
                    if(onRejected){
                        reject(onRejected(reson) || _this.rejectReson);
                    }else{
                        reject(_this.rejectReson)
                    }
                });
            }
        });
    }
}

if (typeof window !== 'undefined') {
    window.Promise = Promise;
}
if (typeof global !== 'undefined') {
    global.Promise = Promise;
}



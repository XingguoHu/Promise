

class Promise{
    constructor(executor) {//executor 执行器函数
        this.status = 'pending';
        this.value = null;
        this.rejectReson = null;
        this.reject = this.reject.bind(this);
        this.resolve = this.resolve.bind(this);
        this.then = this.then.bind(this);
        executor(this.resolve, this.reject);
    }
    resolve(value) {
        if(this.status === 'pending'){
            this.status = 'resolved';
            this.value = value;
        }
        
    }
    reject(rejectReson) {
        if(this.status === 'pending'){
            this.status === 'rejected';
            this.rejectReson = this.rejectReson;
        }
    }
    then(onFulfilled, onRejected){
        if(this.status === 'resolved'){
            onFulfilled(this.value);
        }
        if(this.status === 'rejected'){
            onRejected(this.value);
        }
    }
}


module.exports = Promise;
if(window){
    window.Promise = Promise;
}

require('./index')
const a = new Promise(function(resolve, reject){
    resolve('error');
}).then(function(value){
    console.log(value)
    return 111
}).then(function(value){
    console.log(value)
    return 333
}).then(function(value){
    console.log(value)
}).then(function(value){
    console.log(222)
})







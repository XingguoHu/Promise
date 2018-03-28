require('./index')


const b = new Promise(function (resolve, reject) {
    resolve('ff');
}).then(function (value) {
    return 111
})
const a = new Promise(function(resolve, reject){
    resolve('error');
}).then(function(value){
   
    return 222
})


Promise.all([a, b]).then(i =>{
    console.log(i, '-----')
}).catch(e =>{
    console.log(e)
})








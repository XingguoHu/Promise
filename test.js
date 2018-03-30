// require('./index')


// const b = new Promise(function (resolve, reject) {
//     resolve('ff');
// }).then(function (value) {
//     throw new Error('33')
//     return 111
// }).catch(e =>{
//     console.log(e.message)
// })
// // const a = new Promise(function(resolve, reject){
// //     resolve('error');
// // }).then(function(value){

// //     return 222
// // })


// // Promise.all([a, b]).then(i =>{
// //     console.log(i, '-----')
// // }).catch(e =>{
// //     console.log(e)
// // })



function* genFun1() {
    yield 2;
    yield 3;
    yield 4;
}

function* genFun2() {
    yield 1;
    yield genFun1;
    yield 5;
}
for (var i of genFun2()) {
    console.log(i);
}
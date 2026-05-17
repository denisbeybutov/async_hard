
//------------- allsettled

// allSettledMyVariant([
//     Promise.resolve(42),
//     new Promise((resolve) => setTimeout(() => resolve(100), 5000)),
//     new Promise((resolve) => setTimeout(() => resolve(100), 5000)),
//     'aaa', // Непромисовое значение
//     Promise.reject(new Error("Ошибка!")),
//     990
//   ]).then(values => console.log(values));

//   function isPromise(obj) {
//     return obj instanceof Promise;
//   }

//    function allSettledMyVariant(arr){
//     return new Promise ( resolve => {
//         let returnArr = [];
//         let count = 0;
//         for(let i=0; i < arr.length; i++) {                        
            
//             if(!isPromise(arr[i])) {
//                 returnArr[i] = {
//                     status: 'fulfilled',
//                     value: arr[i]                        
//                 }
//                 count++;
//                 if(count === arr.length) resolve(returnArr);
                
//             } else {
//                 arr[i]
//                 .then(resProm => {
//                     returnArr[i] = {
//                         status: 'fulfilled',
//                         value: resProm                        
//                     }
                    
//                 })
//                 .catch(err => {
//                     returnArr[i] = {
//                         status: 'rejected',
//                         reason: err                        
//                     }
//                 })
//                 .finally(()=>{
//                     count++;
//                     if(count === arr.length) resolve(returnArr);
//                 })
//             }
            
//         }        
        
//     })
    
//   }

//-----------promise all моя реализация

// let arr = [
//     Promise.resolve(42),
//     new Promise((resolve) => setTimeout(() => resolve(100), 3000)),
//     new Promise((resolve) => setTimeout(() => resolve(102), 3000)),
//     'aaa', // Непромисовое значение
//     // Promise.reject(new Error("Ошибка!")),
//     990
// ]


//   function isPromise(obj) {
//     return obj instanceof Promise;
//   }

// function myPromiseAll(arr){
//     return new Promise((resolve,reject) => {
//         let returnArr = [];
//         let count = 0;

        
//         for(let i=0; i<arr.length; i++){

//             if(isPromise(arr[i])){
//                 arr[i].then(res=>{
                
//                     returnArr[i] = res;
//                     count++
//                     if(count ===arr.length) resolve(returnArr);
    
//                 })
//                 .catch(err=>{
//                     reject(err);
//                 })
//             }
//             else {
//                 returnArr[i] = arr[i];
//                 count++;
//                 if(count ===arr.length) resolve(returnArr);
//             }
            
        
//         }
        

//     })
// }

// myPromiseAll(arr).then(res=>console.log('result',res)).catch(console.log);

// promise any моя версияzz

let arr = [
    // 11,
    new Promise((resolve) => setTimeout(() => resolve(100), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(102), 3000)),
    'aaa', // Непромисовое значение
    Promise.reject(new Error("Ошибка!")),
    990,
    Promise.resolve(42)
]

Promise.any(arr).then(console.log).catch(console.log)

  function isPromise(obj) {
    return obj instanceof Promise;
  }

function myPromiseAny(arr){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < arr.length; i++){
            if(isPromise(arr[i])){
                arr[i].then(res => resolve(res)).catch(err=>err)
            }
            else {
                resolve(arr[i])
            }
            
        }
    })

}

myPromiseAny(arr).then(console.log).catch(console.log);
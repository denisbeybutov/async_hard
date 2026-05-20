
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





//----------------------- promise any моя версия

// let arr = [
//     11,
//     // new Promise((resolve) => setTimeout(() => resolve(100), 2000)),
//     // new Promise((resolve) => setTimeout(() => resolve(102), 4000)),
//     // 'aaa', // Непромисовое значение
//     Promise.reject(new Error("Ошибка!")),
//     new Promise((resolve, reject)=> setTimeout(() => reject('error: ошибка 10'),4000)),
//     990,
//     // Promise.resolve(42)
// ]

// Promise.any(arr)
//     .then(res => console.log('promise any: ',res))
//     .catch(res => console.log('promise any: ',res))

//   function isPromise(obj) {
//     return obj instanceof Promise;
//   }

// function myPromiseAny(arr){
//     return new Promise((resolve, reject) => {
//         let count = 0;
        
//         for(let i = 0; i < arr.length; i++){
//             if(isPromise(arr[i])){
                
//                 arr[i].then(res =>{
//                     count++;
//                     return resolve(res)

//                 })
//                 .catch(err=>{
//                     count++;                    
//                     if(count === arr.length) return reject('AggregateError: All promises were rejected')
//                     return err
//                 })
                
                
//             }
//             else {
//                 count++;                
//                 resolve(arr[i])
                
//             }
            
//         }
//     })

// }

// myPromiseAny(arr)
//     .then(res => console.log('My promise any: ',res))
//     .catch(res => console.log('My promise any: ',res));


//---------промиссификация

// promisify(f, true), чтобы получить массив результатов
// function promisify(f, manyArgs = false) {
//     return function (...args) {
//       return new Promise((resolve, reject) => {
//         function callback(err, ...results) { // наш специальный колбэк для f
//           if (err) {
//             reject(err);
//           } else {
//             // делаем resolve для всех results колбэка, если задано manyArgs
//             resolve(manyArgs ? results : results[0]);
//           }
//         }
  
//         args.push(callback);
  
//         f.call(this, ...args);
//       });
//     };
//   };
  
//   // использование:
// //   f = promisify(f, true);
// //   f(...).then(arrayOfResults => ..., err => ...)

// function multiResultFunction(a, b, callback) {
//     setTimeout(() => {
//       callback(null, a + b, a * b, a - b);
//     }, 100);
//   }
  
//   const promisified = promisify(multiResultFunction, true);
//   promisified(5, 3)
//     .then(results => console.log(results)) // [8, 15, 2]
//     .catch(err => console.error(err));
  

//---------- middelwares

// function composeMiddlewares(...middlewares) {
//     return function(context) {
//       // Проверяем, что все переданные аргументы — функции
//       for (const mw of middlewares) {
//         if (typeof mw !== 'function') {
//           throw new TypeError('Middleware must be a function');
//         }
//       }
  
//       // Возвращаем промис, который запускает цепочку middleware
//       return new Promise((resolve, reject) => {
//         // Функция для вызова следующего middleware в цепочке
//         function next(index) {
//           // Если индекс вышел за пределы массива — все middleware выполнены
//           if (index >= middlewares.length) {
//             return resolve(context);
//           }
  
//           try {
//             // Получаем текущий middleware
//             const currentMiddleware = middlewares[index];
  
//             // Вызываем его, передавая context и следующую функцию next
//             currentMiddleware(context, () => next(index + 1))
//               .then(() => {
//                 // Если middleware вернул промис и успешно завершился
//                 next(index + 1);
//               })
//               .catch(reject); // Если в middleware произошла ошибка — отклоняем промис
//           } catch (error) {
//             // Если ошибка возникла при вызове middleware (не асинхронная)
//             reject(error);
//           }
//         }
  
//         // Запускаем первый middleware (с индексом 0)
//         next(0);
//       });
//     };
//   }

  
//   const middleware1 = (context, next) => {
//     console.log('Middleware 1: start');
//     context.step1 = 'done';
//     next();
//     console.log('Middleware 1: end');
//   };
  
//   const middleware2 = (context, next) => {
//     console.log('Middleware 2: start');
//     context.step2 = 'done';
//     next();
//     console.log('Middleware 2: end');
//   };
  
//   const composed = composeMiddlewares(middleware1, middleware2);
  
//   composed({ start: 'initial' })
//     .then(finalContext => console.log('Final context:', finalContext))
//     .catch(err => console.error('Error:', err));
  
//   // Вывод:
//   // "Middleware 1: start"
//   // "Middleware 2: start"
//   // "Middleware 2: end"
//   // "Middleware 1: end"
//   // "Final context: {start: "initial", step1: "done", step2: "done"}"
  

//------------- получить юзеров

// const lengthOdTitle = 20;

// // запрос альбомов
// let url = 'https://jsonplaceholder.typicode.com/albums';
// let response = await fetch(url);
// let albums = await response.json();

// // фильтр альбомов по длине заголовка
// const filterAlbums = albums.filter(album => album.title.length < lengthOdTitle);
// console.log(`Альбомы у которых длина меньше ${lengthOdTitle}`,filterAlbums);

// // массив с id юзеров
// const usersId = filterAlbums.map(album => album.userId)
// let uniqUsers = [...new Set(usersId)]

// // делаем запросы по этим id юзеров
// let userFetch = uniqUsers.map(user=>fetch(`https://jsonplaceholder.typicode.com/users/${user}`));
// let responses = await Promise.all(userFetch);
// let arrUsers = await Promise.all(responses.map(resp => resp.json()));
// console.log(`Инфо о юзерах`,arrUsers);


//---------------- получить юзеров 2

const url = 'https://jsonplaceholder.typicode.com/todos';
let response = await fetch(url);
let todos = await response.json();

const filterTodos = todos.filter(todo => todo.completed === false);
console.log('Todo у которых completed === false',filterTodos);

const userId = filterTodos.map(todo => todo.userId)
// console.log(userId)

const uniqUserId = [...new Set(userId)]
// console.log(uniqUserId)

// // делаем запросы по этим id юзеров
let userFetch = uniqUserId.map(user=>fetch(`https://jsonplaceholder.typicode.com/users/${user}`));
let responses = await Promise.all(userFetch);
let arrUsers = await Promise.all(responses.map(resp => resp.json()));
console.log(`Инфо о юзерах`,arrUsers);
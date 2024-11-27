console.log("start");

setTimeout(() => {
    console.log("callback after 0 milliseconds")
}, 0);

setTimeout(() => {
    console.log("callback after 5000 milliseconds")
}, 5000);

console.log("end");


const radius =[3,1,3,4];

const area = function(radius){
    return Math.PI * radius * radius;
}

const circumfernce = function(radius){
    return 2 * Math.PI * radius;
}

const diameter = function(radius){
    return 2 * radius;
}


const calculateParameters = function(arr, logic){
    const output =[];
   for(let i =0; i < arr.length; i++){
    output.push(logic(arr[i]));
   }
   return output;
}

console.log("Area");
console.log(calculateParameters(radius, area));
console.log("use of map function is similar to calculateParameters function")
console.log(radius.map(area));
console.log("circumfernce");
console.log(calculateParameters(radius, circumfernce));
console.log("diameter");
console.log(calculateParameters(radius, diameter));


const arr =[5,7, 1,3,2,6];

function double(x){
    return x * 2;
}

const output = arr.map(double);
console.log("map function example");
console.log(output);

console.log("map function xample using arrow function");
const result = arr.map((x) => x.toString(2));
console.log(result);


function evenNumber(x){
    return x % 2 === 0;
 }
const filterExample = arr.filter(evenNumber);
console.log("filter function example: " + filterExample);


const reduceExample = arr.reduce((accumulator, current) => accumulator += current);// it takes 2 parameters -> accumulator(result) that is for example say sum here and current is the urrent array element
console.log("reduce function example: "+ reduceExample);

const reduceExampleMax = arr.reduce((accumulator, current) => accumulator = current > accumulator ? current : accumulator);
console.log("reduce function example: "+ reduceExampleMax);


const users = [
    {firstname: "sumedha", lastname:"jhanji", age:41},
    {firstname: "aaaa", lastname:"bbb", age:41},
    {firstname: "abc", lastname:"def", age:28},
    {firstname: "xyz", lastname:"qas", age:47},
];

//list of full name of all users
console.log("full names: "+ users.map((x) => x.firstname +" " + x.lastname));

//find uses with particular age and count
//{41: 2, 28: 1, 47: 1}
const ageResult = users.reduce(function(acc, curr){
    if(acc[curr.age])
    {
        acc[curr.age] = ++acc[curr.age];
    }
    else{
        acc[curr.age] = 1;
    }
    return acc;
}, {});

console.log("ageResult :" )
console.log(ageResult);


//get first name of all the users whose age is less than 47
console.log(users.filter((x) =>x.age < 47).map(x => x.firstname));
 
var ageResultReduce = users.reduce(function (acc, curr)  {
    if(curr.age< 47)
        acc.push(curr.firstname);

    return acc;
},[]);
console.log(ageResultReduce);

//promise creation
function createPromise(boolValue){
    const pr = new Promise(function(resolve, reject){
        if(!boolValue){
            reject(new Error("promise rejected"));
        }
        else
        {
            setTimeout(() => resolve("promise resolved"), 5000);
        }
    });
    return pr;
}

function promiseChaining(stateOfPromise, boolState){
    const pr = new Promise(function(resolve, reject){
        if(boolState)
            resolve("Promise chaining resolved");
        else
            reject(new Error("chaining Rejected"));
    });
    return pr;
}

//consume promise
console.log("Promise Consumption Example");
createPromise(true)
    .then((stateOfPromise) => console.log(stateOfPromise))
    .catch((error) => console.log(error));

createPromise(false)
    .then((stateOfPromise) => console.log(stateOfPromise))
    .catch((error) => console.log(error));


//chaining
console.log("Promise Chaining Example");
createPromise(true)
    .then((stateOfPromise) =>{ console.log(stateOfPromise); return stateOfPromise;} )
    .then((stateOfPromise) => { return promiseChaining(stateOfPromise, true); })
    .then((chainingResult) => console.log(chainingResult))       
    .catch((error) => console.log(error));

createPromise(true)
    .then((stateOfPromise) => { console.log(stateOfPromise); return stateOfPromise;} )
    .then((stateOfPromise) => { return promiseChaining(stateOfPromise, false); })
    .then((chainingResult) => console.log(chainingResult))       
    .catch((error) => console.log(error));
    
//here first promise will fail so it will not proceed further.
createPromise(false)
    .then((stateOfPromise) => { console.log(stateOfPromise); return stateOfPromise;} )
    .then((stateOfPromise) => { return promiseChaining(stateOfPromise, true); })
    .then((chainingResult) => console.log(chainingResult))       
    .catch((error) => console.log(error));

//catch will chekc error only for first then
createPromise(false)
    .then((stateOfPromise) => { console.log(stateOfPromise); return stateOfPromise;} )
    .catch((error) => console.log(error))
    .then((stateOfPromise) => { return promiseChaining(stateOfPromise, false); })
    .catch((error) => console.log(error))
    .then((chainingResult) => console.log(chainingResult));    


//promise apis example
//promise.all
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P1 Success");
    }, 3000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve("P2 Success");
    }, 5000);

    // setTimeout(() => {
    //     reject("P2 failure");
    //  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P3 Success");
    }, 2000);
});


Promise.all([p1,p2,p3])
    .then(res => {console.log("Promise.all API example"); console.log(res);})
    .catch(err => {console.log("Promise.all API example"); console.error(err)});

//promise.allSettled
Promise.allSettled([p1,p2,p3])
    .then(res => {console.log("Promise.allSettled API example"); console.log(res);})
    .catch(err => {console.log("Promise.allSettled API example"); console.error(err)});

//promise.race
Promise.race([p1,p2,p3])
.then(res => {console.log("Promise.race API example"); console.log(res);})
    .catch(err => {console.log("Promise.race API example"); console.error(err)});
  

//promise.race
Promise.any([p1,p2,p3])
.then(res => {console.log("Promise.any API example"); console.log(res);})
    .catch(err => {console.log("Promise.any API example"); console.error(err)});
  
    
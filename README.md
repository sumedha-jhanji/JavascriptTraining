# Javascript
- Synchronous single thread programming language.
- loosely types language/weakly typed language i.e. it doesn't bind the variables to any specific type. Number assigned variable can later on be assigned string and it will become string.
    
## How it works
- works in ExcutionContext -> firstly a glocal execution context will be created on call stack at lower end.
- **Execution context** consist of 2 component
    - Memory/Varaible Environment -> where each variable or function is stored as key value pair
     - Thread of Execution/Code Block -> where each statement of code is executed in sequential manner.    
- Execution context is created in 2 phases
    - Ist Phase - Creation
       - Memory creation phase 
            - allocate all memory to variables and functions.
        - for all variables it assigns "UNDEFINED" (Placeholder for actual value), for functions, it will assign whole function code to it.
     - 2nd Phase - Code Execution phase 
      - excutes each line of code one by one
      - if there is value assignment to variable, it will assign that value in memory block in place of undefined. i.e. replaces undefined with value in phase 1 part.
      - If we invoke any function -> a new Execution Context will be created inside global execution context. Once it is done, the local execution context will get deleted.
**Note:** After all Javascript gets over then glocal execution context will also gets deleted.

- The whole processing of execution context is maintained on stack called CALL STACK. Also know as    
 - Control stack
 - Execution context stack
 - Program stack
 - Runtime stack
 - Machine Stack

## Hoisting in Javascript
- Hoisting means, we can acess variables and function in javscript before initializing or defining it with out any error.
```js
getName();
console.log(x);
var x = 7;
function getName(){
console.log("Javascript");
}
**OUTPUT**
- Javascript
- undefined.


getName();
console.log(x);
function getName(){
console.log("Javascript");
}
**OUTPUT**
- Javascript
- error -not defined -> as no memory allocation with undefined has been made for x here.
- why so -> because before execution starts, it runs 1st phase -> memory creation.

getName();
console.log(x);
var getName = () => {// here it is arrow function
console.log("Javascript");
}
**OUTPUT**
- error as now getName is arrow function which just behaves like another variable for memory allocation. In first line, it is invoking function which is not available.

getName();
console.log(x);
var getName = function() {//here also it will behave like another variable
console.log("Javascript");
}
**OUTPUT**
-  error 

var x = 1;
a();
b();
function a(){
//var x  = 10; // since x is not available in local execution context, it will go to global execution context and will print 1 in next line
console.log(x);
}

function b(){
var x  = 100; // will be in local execution context of b(). so next line will print 100
console.log(x);
}
console.log(x); // glocal execution context
```

## Window object and this keyword
- when ever we run a javscript, Javascript engine (JE) creates 
 - global execution context (GEC)
 - gloabl object called WINDOW (global space)
 - this keyword which is equivalent to WINDOW in gloabl space
- any variable or function defined in global space can be accessd using 
 - window.variable  OR window.function
 - variable OR function
 - this.variable OR this.function
- even for a blank javascript file, JE creates above 3 - GEC, window, this

## Undefined
- a keyword in javascript which states that it is like a placeholder for a value in variable

## Scope and Lexical Environment
- Lexical Environment
 - lexical means hirerachy.
 - Whenever an execution context is created, a lexical environment is created. Lexical environment is the local memory along with the lexical environment of its parent. Lexical as a term means in hierarchy or in sequence.
 - Having the reference of parent's lexical environment means, the child or the local function can access all the variables and functions defined in the memory space of its lexical parent.  
 - example
 ```js
 function a(){
     var d = 100;
     console.log(b); // will print 10
     function c(){
         console.log(b); // will print 10
         console.log(d);// will print 100
     }
     c();
 }

 var b = 10;
 a();
 console.log(d); // not defined error
```
**Explanation**
- GEC -> memmory (b, a + lexical environment of parent which is null);
- execution context of a() -> memory(d, c + lexical environment of GEC)
-  execution context of c() -> memory(lexical environment of a())
- the JS engine first searches for a variable in the current local memory space, if its not found here it searches for the variable in the lexical environment of its parent, and if its still not found, then it searches that variable in the subsequent lexical environments, and the sequence goes on until the variable is found in some lexical environment or the lexical environment becomes NULL.

## Scope
- where u can access specific function / variable. A variable can be accessed in same function or inside functions.
- scope of variable is directly dependent on lexical Environment.

## Scope Chain 
- The mechanism of searching variables in the subsequent lexical environments is known as Scope Chain. If a variable is not found anywhere, then we say that the variable is not present in the scope chain.

## LET & CONST 
- are hoisted in temporal dead zone -> different from var declaration
- Let and Const are declared in separate memory which is not assigned to Global object where as var variable gets memory allocation which is assigned to global object
- let and const cannot be accessed before they are initialized where as var can be accessed before declaration also.
- these variables cannot be attached to Global Object "Window"
- Let variables cannot be re-declared after initialization in same scope. It will give syntax error
- LET variable can be defined at one place and can be initialized later on but that cannot be one with CONST. CONST needs to eb declared and initialized at same time
- example
```js
let a;
const b=100;
a=10;// this is possible
console.log(a);
const c; // not possible
c=1000;// not possible//Syntax error
```
- CONST variable cannot be re-assigned
```js
const b = 10; 
b=1000; // not possible // TypeError.
```

## Temporal dead zone
- time between let varizble was hoisted till time it was assigned value.
-  variables in this zoen cannot be accessed.
- once variable is assigned value, then they come out of this zone.

## Reference Error
- When we try to access the variable in Temporal dead zone -> gives reference error -like cannot access 'a' before initialization.
- When JE tryies to fetch a variable which has not been defined in scope.

## Block 
- compound statement- combine multiple statements together

## Block Scope
- what all variables and functions we can access inside block are called block scope

## Shadowing
- inner scope var variable shodows the outer scope var variable and also overrites the value in same memory space.
- inner scope let/const variable shodows the outer scope let/const variable  but doesn't override memory
```js
var a = 100;
{
   var a = 10;
   console.log(a); //10
}
console.log(a); //10
```

## examples of let, var, const - shadowing, block scope
```js
var a = 100;
let b= 200;
const c = 300;
{
var a =10;
let b= 20;
const c= 30;
console.log(a); //10
console.log(b);//20
console.log(c);//30
}

console.log(a);//10
console.log(b);//200
console.log(c);//300
```

## CLOSURES
- a function bundled together with its lexical environment.
```js
function x(){
 var a=10;
 function y(){
  console.log(a);
 }
 y();
}
x();
```
- In case of returning a function from function, returned function will remeber its lexical scope(will also remeber lexical scope of its parent also) due to closures.
```js
function x(){
    var a=10;
    function y(){
        console.log(a);
    }
    return y; // it will return closure = function + lexical scope.
}
var test = x();// after this x()'s execution context will get vanished
console.log(test);// will print function 
test(); // will print 10 value of a as it will remeber its lexical scope  (containe sreference of parent variables)
```

## Uses/advantages of Closure
- Module Design Pattern
- Currying
- Functions like once (function in javascript which can only run once)
- memoize
- maintaining state in async world
- setTimeouts
- Iterators
- data hiding and encapsulation

## Disadvantage of Closure
- consumes lot of memory, memory leaks if not handles properly
- variables are not Garbage collected till program expires

## setTimeout + Closure
- Javascript doesn't run the setTimeout at the place where it is written.
- it takes the setTimeout callback function(which is a closure) , attaches the time specified and then whne time reaches, it calls that function.
- Meanwhile it will continue with the next line execution as Javascript doesn't wait for ant one.

```js
function x(){
    var i = 1;
    setTimeout(function(){ // javscript will use this closure function and attach timer to it and place it at some other location. After 3 seconds, it will bring that function to call stack and execute the same
         console.log(i); 
    }, 3000);
    console.log("hello will be printed first"); // it will get printed
}
x();

//output 
hello will be printed first
1 // will be printed after 3 seconds
```
## setTimeOut()
- calls a function after a number of milliseconds
-executed only once
- Use the clearTimeout() method to prevent the function from starting.
- To clear a timeout, use the id returned from setTimeout():
```js
myTimeout = setTimeout(function, milliseconds);
clearTimeout(myTimeout);
```

## setInterval()
- calls a function at specified intervals (in milliseconds)
- method continues calling the function until clearInterval() is called, or the window is closed.
- To clear an interval, use the id returned from setInterval():
  ```js
  myInterval = setInterval(function, milliseconds);
  ```
- Then you can to stop the execution by calling clearInterval():
   ```js
  clearInterval(myInterval);
  ```
```js
function x(){
    for(var i=1; i<=5; i++)
    {
        setTimeout(function(){
            console.log(i);
        }, i*1000)
    }
console.log("Hello");
}
x();

//output will be 
Hello
6
6
6
6
6

rather than

1
2
3
4
5
```
- this is because call back function is closure -> it contains reference of i variable due to lexical environment.
- when setTimeout will run, i's value is 6.
- To resolve this         
 - First approach
  - use "let" in place of "var" in for loop as let has block scope.
  - so everytime the settimeout is used in loop, it gets new copy of "i" variable in closure.
  ```js
  function x(){
      for(let i=1; i<=5; i++)
      {
          setTimeout(function(){
          console.log(i);
          }, i*1000)
      }
      console.log("Hello");
      }
      x();
  ```
 - Second approach
  ```js
   function x(){
     for(var  i=1; i<=5; i++)
     {
         function close(x){ // form a closure, here it will get new copy of i every time,
             setTimeout(function(){
             console.log(x);
             }, x*1000)
         }
         close(i);
     }
     console.log("Hello");
     }
     x();
  ```

## Examples of closure
```js
1   function outest(){
     var c = 100;
     function outer(b){
         function inner()
         {
         console.log(a, b, c);
         }
         let a = 10;
         return inner;
     }
 var close = outer(20);
 close();
 }
 outest();
 // output 10, 20, 100

 2  function outest1(){
     var c1 = 100;
 function outer1(b1){
     function inner1()
     {
     console.log(a1, b1, c1);
     }
     let a1 = 10;
     return inner1;
 }
     return outer1;
 }
 var close = outest1()(30);
 close();
 //output 
 10, 30, 100

 3  function counter()
 {
     var count = 0; //data hiding
     return function incrementCounter(){
         count++;
         console.log(count);
     }
 }

 var counter1 = counter();
 counter1(); //1 referebce say a of count in lexical scope
 counter1(); //2 old refernce of count i.e a in lexical scope


 var counter2 = counter();
 counter2(); //3 (new reference of count say b in lexical scope)

 4 example of closure with constructor function

 function counter()
 {
     var count = 0;
     this.incrementCounter = function (){
         count++;
         console.log(count);
     }
 
     this.decrementCounter = function (){
         count--;
         console.log(count);
     }
 }

 var counter1 = new counter();
 counter1.incrementCounter();
 counter1.incrementCounter();
 counter1.decrementCounter();


 5 example of garbage collected partially

 function a(){
     var x = 0, z = 10;// here since z is not being used any where so in case of closure, z will get released by GC but x will remain as y() or b() can be used anytime in code later on
     return function b(){
         console.log(x);
     }
 }
 var y = a();
 y(); // at this point  we cannot access z in console.
```

## FUNCTIONS
- Function acts like a value.
- Function statement or Function declaraion
```js
a() //calling it before defining will work
function a(){
   console.log("function statement);
}
a(); 
```
## Function Expression 
```js
b();// calling it before defining won't work. It will give error. It is treated as variable and assignd undefined. once code reaches line, it will assign function value to b variable
var b = function(){
   console.log("function expression);
}
b();
```
- difference between above 2 is hoisting


## Anonymous function
- a function without name 
- they don't have there own identity
- they can used in place where we need function as values. We cannot declare them independentyly just like other functions
- function() {}

## Named function expression 
- similar to function expression but function will also have name,
```js
var b = function xyz(){ }
b(); // this will work.
xyz(); will give reference error. xyz is not in global scope but in local scope

var b = function xyz(){
    console.log(xyz); // it will print function as it is.
}
b();
xyz();// but this statement wont work.
```

## Arrow functions
```js
var d  = () =>{
 console.log("arrow function")
}
d();
```

## First class functions/ First class citizens
- functions passed inside functions as arguments.
- functions returned from a function i.e. ability to use the function as value or pass as arguments

## Callback functions
- functions passed as aurgument to another function which will be execuetd at some other place.
```js
setTimeout(function(){}, 5000) // first parameter is callback function. It is also example of closure too.
```
        
# Closures + Callback functions + Event Listeners example
```js
function attachEventListener(){ 
    let count = 0;
    document.getElementById("clickMe").addEventListerner("click", function xyz(){ 
        // xyz is a call back function. It behaves as handler
        //it will form closure with its outer lexical scope of attachEventListener + global environment
        console.log("button clicked", ++count);
    })
}
attachEventListener();
```
- we must remove event lsiteners as
 - they are heavy and takes memory.
 - even if call stack is empty, still GC is not freeing up the memory as we have closure with handlers.

## Key Points
- Browse has JE which has call stack
- all javascript code runs inside Global Execution context which runs each line of javascript code and thenh deletes the GEC.
- so if we have any task that needs wait etc we cannot do that as Javascript doesn't have timer.
- So brower provides various of its capabilities via a Global object know as WINDOW to GEC inside JE.
- These capabilities are WebAPIs
 - fetch()
 - setTimeOut()
 - local storage
 - console
 - DOM API (document.*)
 - location

## EVENT LOOP
- say we have setTimeout() method called in javascript code which has timer of 5 seconds
- once all code of hjavascript gets executed, GEC will pop out of call stack. but setTimeOut() is still waiting as its timer has not expired.
- once the timer gets expired, it needs to come into call stack. 
- for that we need Callback queue and event loop
- Event Loop 
 - acts like a gatekeeper and checks if call stack is empty and there is any thing in call back queue. If yes, then pop in the call back method from queue into calls stack.
- Callback queue    
 - when the timer for settimeout() expires, it will put the registered call back function into call back queue from where event loop will popin the same into call stack
 - call stack will quickly executes that function
 - similar things will happen with addEventListerner

## How fetch() works in this case
- Event Loop keeps on checking the call stack in JE.
- Meanwwhile, we hev received a data from api(promise).
- callback function from promise will now get pushed into "MICRO TASK" Queue rather than call back queue.

## MICROTASK Queue 
- queue for callback functions from promises or mutation observers
- get first priority over callback queue by event loop.

## Callback queue starvation
- if MICROTASK queue keeps on adding call backs from promises or inner promises and so on.. there will be a possibility that callback queue functions will never get a chance to execute that is called starvation.
```js
console.log("start");

setTimeout(function cbt(){
    console.log("SetTimeout Call back");
},5000);

fetch("https://api.netflix.com")
    .then(function cbF(){
        console.log("fetch ballback");
    });

console.log("End");
```

- how it will get executed
 - logs start
 - register setTimeout in browser webapi and attach timer of 5000 seconds
 - register fetch in WebApi.
 - log end.
 - now say fetch has received a response and timer also expires.
  - it will place cbF() in MicroTask Queue
  - place cbt() in Callback queue
 - event loop will continuosly monitor csllstack in JE
 - once is is cleared, it will first pop cbf() into call stack 
 - once that is done, it will pop cbt() into call stack.

## Higher Order functions
- a function which takes other function as argument or return another function is called higher order function
- we have abstracted our code into smaller units which has just one task to implement.
- calculateParameters is a higher order function 
- we have created small reusable components, implementing modularity.
- area is a call back function
- MAP() is javscript given higher order function 
 - maps the things passed. 
    It iterates on each element and returns the output
```js
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

const calculateParameters = function(radius, logic){ // created generic function, thus reducing code repititions following DRY(donot repeat yourself) principle
    const output =[];
    for(let i =0; i < radius.length; i++){
        output.push(logic(radius[i]));
    }
    return output;
}

console.log(calculateParameters(radius, area));

console.log(calculateParameters(radius, circumfernce));

console.log(calculateParameters(radius, diameter));
```
- if we want to use calculateParameters as radius.calculateParameters(area) --- we can define calculateParameters as belew:
```js
Array.prototype.calculateParameters = function(logic){ //now calculate will attach to all the arrays, radius will get attached to function via a this
    const output =[];
    for(let i =0; i < this.length; i++){
        output.push(logic(this[i]));
    }
    return output;
}
```
        
## map()
- used to transform an arrays
- perform some operation each element of array and form a new array

## filter()
- used to filter values from array.
- example we want to filter even numbers

## reduce()
- used where we want to take all elements of an array and come out as single value
- example we want to find out largest number in array or we want to sum an array

## Callback Hell 
- nested callbacks
- it is also called as PYRAMID OF DOOM.

## Issues with call back
- callback hell
- inversion of control - i.e. we leave conttol in hands of other api in form of call back or we can say we loose the control of our code.
    
## Promises
- used to handle async operations.
- an empty object with some data object in it.
- it will get actual data once current api returns the result.
- .then() -> function available over promise object. We will attach callback function to promise object using .then().
- here we will have the control of code.
- it resolved IOC issue of callback.
- it builds a trust and confirms that callback will get called and that too only one time.
- promise object is immutable, resolved just once.
- it can just have 3 states 
 - pending
 - fullfilled
 - rejected.

- Promise is an object representing eventaul completion or failure of an async operation.

## Promise Chaining
- to resolve callback hell issue
```js
createOrder(cart).then(callback function()).then(callback function());
```
        
## How to create our own promise, handle errors.
- We use Promise constructor which takes a function with 2 paratmeters
 - resolve
 - rejected
    
- resolve and reject are 2 methods that are given by javascript to create a promise
```js
//producer
function functionname(parameters){
    const pr = new Promise(function(resolve, reject){
        //logic


        //false condition
        //reject(new Error("rejected"));

        //true condition
        //resolve(pass the result set we need to return);
    });
    return pr;
}

//consumer
const prresult = functioname(parameters).then(//logic);
```
            
## ASYNC AWAIT
- async function will always return a promise
- async await combination is used to handle promises. Earlier we are using .then() for that but now we can just write "await promisevariable"
    
## Promise APIs
- used when we are making parallel calls.

- Promise.all()
 - when we are making multiple api calls and we want the results from all the apis
 - it takes iterable object of promises as contract(parameter).
 - it will wait for all prmises in iterable object to settled (resolve/rejeted) and will return result in itreable object 
 - In case, any of the promise will get rejected, promise.all() will return an error AS SOON as error happened. It won't wait for all other promises to complete. Rest api's will continue.

- Promise.allSettled()
 - either sucess or failure, it will wait for all promsies to get settled and then will return an array of object.

- Promise.race()
 - it will return first settled array irrespective of whether it is resolved or rejected.

- Promise.any()
 - it will retur first successfully settled promise result. 
 - if all will get fail, it will return aggregate error with all errors as an array of objects.

## THIS keyword
- in global object it is WINDOW Object
- In Functions  
 - if it is non srict mode, it is WINDOW Object
 - if it is strict mode 
  - if called directly as methodname() ->  it is UNDEFINED. (because of "this substitution" -> if value of this keyword is undefined or null, then it will be replaced with global object.) 
  - if called as window.methodname() -> it will be window
- Inside object's method
 - it will be object reference
- call(), apply(), bind ()
 - these methods are used to share the data between objects. Basically we are overiding the value of "this" using these methods.
 - example -say we have an object with method print(). we have another object. Now we want to call the print() of first object. we can do that by using obj1.print.call(obj2);        
 
 - call() -> borrow function into an object
 - apply() -> same as above. Difference is if we need to pass arguments, we need to pass them as list of arguments in case of "apply()";
 - bind() -> calling is similar to call() but it will return a copy of function binded and we can then call that function later as needed.

- inside arrow functions
 - they don't have "this" binding associated with it
 - they provide value of enclosing lexical context.
- inside DOM
 - referencing html element's reference like if we have used "this" in button, then it will give reference of "HTML button"


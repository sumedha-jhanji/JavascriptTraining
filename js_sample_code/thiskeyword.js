 "use strict";

console.log("This keyword in global space: ");
console.log(this); //window object

function thisKeyword(){
    console.log("This keyword in function:  ");
    console.log(this); 

}
thisKeyword();// window object if non strict mode. //undefined if strict mode
window.thisKeyword(); //in sttrict mode it will window object now. bcasue function is called using window object reference.

const student ={
    firstname: "sumedha",
    lastname: "jhanji",
    printName: function(hometown, state){ // it is caled method. i.e. when function is created inside an object
       // console.log("This keyword inside object's method:  ");
       // console.log(this);
        console.log(this.firstname + " " + this.lastname + " from " + hometown +" , " + state); // will log "10" as this is reference of obj
    }
}
student.printName("ludhiana", "punjab"); // object reference

const student2 = {
    firstname: "sumedha",
    lastname: "jhanji",
}

console.log("call() method example:  ");
student.printName.call(student2, "ludhiana", "punjab"); // here we are overiding the value of this in student obj.

console.log("apply() method example:  ");
student.printName.apply(student2, ["Ludhiana", "punjab"]); // diff is passing this arguments

console.log("bind() method example:  ");
let printFullName = student.printName.bind(student2, "Ludhiana", "punjab"); //it will return the copy of the method.
console.log(printFullName);
printFullName();

//arrow functions
const obj ={
    a: 10, x:() =>{
        console.log("This keyword inside arrow function:  ");
        console.log(this);
    }
}
obj.x();// it will be enclosing lexical context i.e window object here as obj is lexically present in window.

const obj2 ={
    a: 10, x:function(){
       const y = () =>{
        console.log("This keyword inside nested arrow function:  ");
        console.log(this); // lexical scope is this object(obj2).
       }
       y();
    }
}
obj2.x();

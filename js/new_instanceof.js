function Person(name, age){
    this.name = name
    this.age = age
}
Person.prototype.sayHi = function(){
    console.log(`Hi! My name is ${this.name}, and my age is ${this.age}`)
}

let Jack = new Person("Jack", 18)
Jack.sayHi()

function myNew(fn, ...args){
    let obj = Object.create(fn.prototype)
    let r = fn.apply(obj, args)
    return r instanceof Object ? r : obj
}

function myNew2(fn, ...args){
    let obj = new Object()
    let r = fn.apply(obj, args)
    Object.setPrototypeOf(obj, fn.prototype)
    return r instanceof Object ? r : obj
}

let Tom = myNew(Person, "Tom", 22)
Tom.sayHi()
let Lily = myNew2(Person, "Lily", 23)
Lily.sayHi()

function generateInstance(obj){
    function F(){}
    F.prototype = obj
    return new F()
}
function Teacher(name, age, experience){
    Person.call(this, name, age)
    this.experience = experience
}
let ins = generateInstance(Person.prototype)
Teacher.prototype = ins
Teacher.prototype.sayExperience = function(){
    console.log(`I am a teacher, and I have ${this.experience} years' experience.`)
}
ins.constructor = Teacher
let Lucy = new Teacher("Lucy", 15, 5)
Lucy.sayHi()
Lucy.sayExperience()
console.log('instanceof', Lucy instanceof Teacher, Lucy instanceof Person)
console.log('instanceof', Jack instanceof Person, Jack instanceof Teacher)

function myInstanceof(obj, cons){
    const basic_types = ['string', 'number', 'boolean', 'undefined', 'symbol']
    if(basic_types.includes(typeof obj)) return false
    let cons_p = cons.prototype
    let obj_p = Object.getPrototypeOf(obj)
    while(1){
        if(!obj_p) return false
        if(obj_p == cons_p) return true
        obj_p = Object.getPrototypeOf(obj_p)
    }
}

console.log('myInstanceof', myInstanceof(Lucy, Teacher), myInstanceof(Lucy, Person))
console.log('myInstanceof', myInstanceof(Jack, Person), myInstanceof(Jack, Teacher))

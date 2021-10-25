function isObject(obj){
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null && obj !== undefined
  }
  
function observe(obj){
if(!isObject(obj)){
    throw new TypeError()
}
Object.keys(obj).forEach((key) => {
    if(isObject(obj[key])) observe(obj[key])
    let internal_value = obj[key]
    let dep = new Dep()
    Object.defineProperty(obj, key, {
    get(){
        dep.depend()
        return internal_value
    },
    set(new_value){
        internal_value = new_value
        dep.notify()
    }
    })
})
}


let active_update
class Dep{
    constructor(){
        this.subscribers = new Set()
    }
    depend(){
        if(active_update){
            this.subscribers.add(active_update)
        }
    }
    notify(){
        this.subscribers.forEach(subscriber => subscriber())
    }
}
function autorun(update){
    function wrapper(){
        active_update = wrapper
        update()
        active_update = null
    }
    wrapper()
}

let obj = {a: 1, b:2}
obj.a
obj.b = 2
observe(obj)
autorun(()=>console.log(`value: ${obj.b}`))
obj.b++
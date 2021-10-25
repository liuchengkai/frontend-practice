function isObject(obj){
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null && obj !== undefined
  }
  
function convert(obj){
if(!isObject(obj)){
    throw new TypeError()
}
Object.keys(obj).forEach((key) => {
    if(isObject(obj[key])) convert(obj[key])
    let internal_value = obj[key]
    Object.defineProperty(obj, key, {
    get(){
        console.log(`getting key "${key}": ${internal_value}`)
        return internal_value
    },
    set(new_value){
        console.log(`setting key "${key}" to: ${new_value}`)
        internal_value = new_value
    }
    })
})
}

let obj = {a: 1, b:2}
obj.a
obj.b = 2
convert(obj)
obj.a
obj.b = 3
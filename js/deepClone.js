function deepClone(obj){
    let _obj = Array.isArray(obj) ? [] : {}
    if(obj && typeof obj === 'object'){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                _obj[key] = obj[key] && typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
            }
        }
    }
    return _obj
}
let obj = {
    a: 1,
    b: 2
}
console.log('obj', obj)
let objClone = deepClone(obj)
objClone.a = 5
console.log('objClone', objClone)
console.log('obj', obj)
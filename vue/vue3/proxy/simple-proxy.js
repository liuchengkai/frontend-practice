function MyProxy(obj, handler){
    let _obj = deepClone(obj)
    Object.keys(_obj).forEach((key) => {
        Object.defineProperty(_obj, key, {
            get(){
                return handler.get && handler.get(obj, key)
            },
            set(value){
                handler.set && handler.set(obj, key, value)
            }
        })
    })
    return _obj
    function deepClone(org){
        let tar = Array.isArray(org) ? [] : {}
        for(let key in org){
            if(org.hasOwnProperty(key)){
                tar[key] = org[key] && typeof org[key] === 'object' ? deepClone(org[key]) : org[key]
            }
        }
        return tar
    }
}
function add(...args){
    function _add(..._args){
        args.push(..._args)
        return _add
    }
    _add.getResult = ()=>args.reduce((pre, cur)=>pre+cur)
    return _add
}

console.log(add(1)(2)(22).getResult())
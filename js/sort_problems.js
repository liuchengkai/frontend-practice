function problem(type){
    return {'type': type}
}
const arr = [problem('问答'), problem('选择'), problem('问答'), problem('填空'), problem('问答'), problem('填空'), problem('选择'), problem('选择'), problem('填空')]

console.log(arr)
const order = ['选择', '填空', '问答']
arr.sort((a, b)=>{
    return order.indexOf(a.type) - order.indexOf(b.type)
})
console.log(arr)
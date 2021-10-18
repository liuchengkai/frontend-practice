const calculate = require('./calculate.js')
const {add, minus} = calculate


test('add function', ()=>{
    expect(add(1, 2)).toBe(3)
})

test('minus function', ()=>{
    expect(minus(1, 2)).toBe(-1)
})
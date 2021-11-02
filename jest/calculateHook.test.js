import {add, minus} from './calculate'

beforeAll(()=>{
    console.log("Ready to test all")
})
afterAll(()=>{
    console.log("Done")
})
beforeEach(()=>{
    console.log("Ready to test next one")
})
afterEach(()=>{
    console.log("Done testing one")
})
test('add function', ()=>{
    console.log("testing")
    expect(add(1, 2)).toBe(3)
})

test('minus function', ()=>{
    console.log("testing")
    expect(minus(1, 2)).toBe(-1)
})
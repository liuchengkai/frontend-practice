test('toBe', ()=>{
    const a = 1
    expect(a).toBe(1)
})
// test('toBe', ()=>{
//     const a = {number: 1}
//     expect(a).toBe({number: 1}) // failed
// })

test('toEqual', ()=>{
    const a = {number: 1}
    expect(a).toEqual({number: 1}) // passed
})

test('toBeNull', ()=>{
    const a = null
    expect(a).toBeNull()
})

test('toBeUndefined', ()=>{
    const a = undefined
    expect(a).toBeUndefined()
})

test('toBeDefined', ()=>{
    const a = 1
    expect(a).toBeDefined()
})

test('toBeTruthy', ()=>{
    const a = 1
    expect(a).toBeTruthy()
})

test('toBeFalsy', ()=>{
    const a = 0
    expect(a).toBeFalsy()
})

test('toBeGreaterThan', ()=>{
    const a = 100
    expect(a).toBeGreaterThan(10)
})

test('toBeLessThan', ()=>{
    const a = 9
    expect(a).toBeLessThan(10)
})

test('toBeLessThanOrEqual', ()=>{
    const a = 9
    expect(a).toBeLessThanOrEqual(9)
})

test('toBeCloseTo', ()=>{
    expect(0.1 + 0.2).toBeCloseTo(0.3)
})

test('toMatch', ()=>{
    const str = "hello world"
    expect(str).toMatch('world')
})

test('toContain', ()=>{
    const arr = ['hello', 'world']
    expect(arr).toContain('world')
})

test('toContain', ()=>{
    const arr = ['hello', 'world']
    const mySet = new Set(arr)
    expect(mySet).toContain('world')
})

const throwErrorFunc = ()=>{throw new Error('error')}
test('toThrow', ()=>{
    expect(throwErrorFunc).toThrow()
})

// test('toThrow', ()=>{
//     expect(throwErrorFunc).not.toThrow() //failed
// })
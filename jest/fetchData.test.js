import { fetchDataTimer, fetchDataPromise, fetchDataError } from "./fetchData"

test("fetch data using setTimeout", (done)=>{
    fetchDataTimer((data)=>{
        expect(data).toEqual({
            test: true
        })
        done()
    })
})

test("fetch data using promise", ()=>{
    return fetchDataPromise()
    .then((data)=>{
        expect(data).toEqual({
            test: true
        })
    })
})

test("fetch data Error", ()=>{
    expect.assertions(1)
    return fetchDataError()
    .catch((e)=>{
        expect(e.toString().indexOf('Error')>-1).toBe(true)
    })
})

test("async and await", async ()=>{
    const data = await fetchDataPromise()
    expect(data).toEqual({
        test: true
    })
})
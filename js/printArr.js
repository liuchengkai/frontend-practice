const arr = [1, 2, 3]

function printPerSecond(arr, delay = 1000){
    let i = 0
    let timer = setInterval(()=>{
        console.log(arr[i])
        i++
        if(i >= arr.length) clearInterval(timer)
    }, delay)
}

function printPerSecondPromise(arr, delay = 1000){
    let promise = Promise.resolve()
    arr.map((v) => {
        promise = promise.then(()=>{
            return new Promise(resolve => {
                console.log(v)
                setTimeout(()=>{
                    resolve()
                }, delay)
            })
        })
    })
}

async function printArr(arr, delay){
    console.log('(setInterval) print arr:')
    await new Promise((resolve)=>{
        printPerSecond(arr, delay)
        setTimeout(()=>{resolve()}, (arr.length+1) * delay)
    })
    console.log('(setTimeout and Promise) print array:')
    await new Promise((resolve)=>{
        printPerSecondPromise(arr, delay)
        setTimeout(()=>{resolve()}, (arr.length+1) * delay)
    })
}
printArr(arr, 1000)
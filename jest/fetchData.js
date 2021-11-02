import axios from "axios"

export function fetchDataTimer(fn){
    setTimeout(()=>{
        fn({
            test: true
        })
    },1000)
}

export function fetchDataPromise(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                test: true
            })
        }, 1000)
    })
}

export function fetchDataError(){
    return axios.get("http://jspang.com/jestTest.json")
}
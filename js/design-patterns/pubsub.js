class PubSub{
    constructor(){
        this.subscribers = {}
    }
    subscribe(type, fn){
        let listners = this.subscribers[type] || []
        listners.push(fn)
        this.subscribers[type] = this.subscribers[type] || listners
    }
    unsubscribe(type, fn){
        let listners = this.subscribers[type]
        if(!listners || !listners.length) return
        this.subscribers[type] = listners.filter(v => v!=fn)
    }
    publish(type, ...args){
        let listners = this.subscribers[type]
        if(!listners || !listners.length) return
        listners.forEach(fn => {
            fn(...args)
        });
    }
}

let o = new PubSub()
o.subscribe("level up", (v) => {console.log(`Level ${v}`)})
o.subscribe("level up", () => {console.log("New map unlocked")})
o.publish("level up", 2)
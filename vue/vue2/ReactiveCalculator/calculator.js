// Refer to https://www.bilibili.com/video/BV1Dk4y127Ha?from=search&seid=6794834524573182890&spm_id_from=333.337.0.0

class Compute{
    plus(a, b){
        return a + b
    }
    minus(a, b){
        return a - b
    }
    mul(a, b){
        return a * b
    }
    div(a, b){
        return a / b
    }
}

class Calculator extends Compute{
    constructor(doc){
        super()
        const my_cal = doc.getElementsByClassName("my_calculator")[0]
        this.f_input = my_cal.getElementsByTagName("input")[0]
        this.s_input = my_cal.getElementsByTagName("input")[1]
        this.operators = doc.getElementsByClassName("operators")[0]
        this.my_operators = this.operators.getElementsByTagName("button")
        this.result = my_cal.getElementsByClassName("result")[0]
        this.data = this.defineProperties()
        this.op_index = 0
    }

    init(){
        this.bindEvents()
    }

    bindEvents(){
        this.operators.addEventListener('click', this.onOperatorClick.bind(this), false)
        this.f_input.addEventListener('input', this.onNumberInput.bind(this), false)
        this.s_input.addEventListener('input', this.onNumberInput.bind(this), false)
    }

    onOperatorClick(ev){
        // compatible with IE
        const e = ev || window.event, tar = ev.target || ev.srcElement, tagName = tar.tagName.toLowerCase()

        // if the target element is a button then ...
        tagName === "button" && this.operatorUpdate(tar)
    }

    onNumberInput(ev){
        const e = ev || window.event, tar = ev.target || ev.srcElement, className = tar.className
        const val = Number(tar.value.replace(/\s+/g, '')) || 0
        switch(className){
            case "f-input":
                this.data.f_num = val
                break
            case "s-input":
                this.data.s_num = val
                break
            default:
                break
        }
    }

    operatorUpdate(tar){
        this.my_operators[this.op_index].className = ''
        this.op_index = [].indexOf.call(this.my_operators, tar)
        tar.className += ' current'
        this.data.op = tar.getAttribute("data-operator")
    }

    defineProperties(){
        let _data = {},
            f_num = 0,
            s_num = 0,
            op = 'plus'
        const that = this
        Object.defineProperties(_data, {
            f_num: {
                get(){
                    return f_num
                },
                set(newVal){
                    f_num = newVal
                    that.computeResult(f_num, s_num, op)
                }
            },
            s_num: {
                get(){
                    return s_num
                },
                set(newVal){
                    s_num = newVal
                    that.computeResult(f_num, s_num, op)
                }
            },
            op: {
                get(){
                    return op
                },
                set(newVal){
                    op = newVal
                    that.computeResult(f_num, s_num, op)
                }
            },
        })
        return _data
    }

    computeResult(n1, n2, operator){
        this.result.innerText = this[operator](n1, n2)
    }
}

new Calculator(document).init()
//leetcode 22
function generateParenthesis(n){
    let combinations = []
    let combination = []
    function tryCombination(left_num, right_num){
        if(right_num <= 0){
            combinations.push(combination.join(''))
            return 
        }
        if(left_num > 0){
            combination.push('(')
            tryCombination(left_num - 1, right_num)
            combination.pop()
        }
        if(right_num > left_num){
            combination.push(')')
            tryCombination(left_num, right_num - 1)
            combination.pop()
        }
    }
    tryCombination(n, n)
    return combinations
}

let num = Number(process.argv[2])
if(num<=0 || Number.isNaN(num)){
    console.log('Input should be greater than 0')
    return 
}
console.log(generateParenthesis(num))
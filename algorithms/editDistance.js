//leetcode - 72

function minDistance(word1, word2){
    //initialize table
    let table = []
    for(let i = 0; i <= word1.length; i++){
        table.push([i])
    }
    for(let i = 1; i <= word2.length; i++){
        table[0].push(i)
    }
    for(let i = 1; i <= word2.length; i ++){
        for(let j = 1; j <= word1.length; j++){
            if(word1[j-1] === word2[i-1]){
                table[j][i] = table[j-1][i-1]
            }else{
                table[j][i] = Math.min(table[j-1][i], table[j-1][i-1], table[j][i-1]) + 1
            }
        }
    }
    return table[word1.length][word2.length]
}

console.log(minDistance("horse", "ros"))
console.log(minDistance("intention", "execution"))
console.log(minDistance("zoologicoarchaeologist", "zoogeologist"))
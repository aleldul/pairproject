function sortData(arr){
    
    arr.sort(function(a, b){return b.totalScore-a.totalScore});
    return arr;
}

module.exports = sortData
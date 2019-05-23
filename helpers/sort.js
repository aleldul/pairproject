function sortData(arr){

    // let newArr = []
    // // console.log(arr)
    // arr.forEach(data => {
    //     data.Plays.forEach(play => {
    //         data.dataValues._score = play.totalScore
    //         data.dataValues._level = play.Game.level
    //         newArr.push(data.dataValues)
    //     })
    // });

    
    arr.sort(function(a, b){return b.totalScore-a.totalScore});
    return arr;
}


module.exports = sortData
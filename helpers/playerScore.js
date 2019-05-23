function playerScore(arr, alldata){
    let array = []
    let obj = {}


    alldata.forEach(game => {
        if(obj[game.id] === undefined){
            obj[game.id] = [game.level, 0]
        }
        arr.forEach(play => {
            if(game.id === play.Game.id && obj[game.id][1] < play.totalScore){
                obj[game.id] = [game.level, play.totalScore]
            }
            
        })
    });
    array.push(obj)
    obj = {}
    arr.forEach(data => {
        obj.username = data.User.username
        obj.email = data.User.email
    })
    array.push(obj)


    console.log(array)
    return array
}

module.exports = playerScore
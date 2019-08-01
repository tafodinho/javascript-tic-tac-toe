const GameBoard = (() => {
    const moves = ["", "", "", "", "", "", "", "", ""]
    const clearButton = document.getElementById(".clear")
    const play = (n) => {
        moves[n] = Player.currentPlayer
        Player.switchPlayer()
    }
    const render = () => {
        moves.forEach((value, index) => {
            let boxId = `${index.toString()}`
            document.getElementById(boxId).innerHTML = value
        })
    }

    return { 
                moves,
                render,
                play
           }
})()

const Player = (() => {
    let currentPlayer = "X"
    const switchPlayer = () => {
        if(currentPlayer === "X") {
            currentPlayer = "O"
        } else {
            currentPlayer = "X"
        }
        console.log(currentPlayer)
    }
    return { currentPlayer, switchPlayer }
})()

const GamePlay = (() => {
    const makeMove = (n) => {
        GameBoard.play(n)
        GameBoard.render()
    }
    return { makeMove }
})()
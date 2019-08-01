const Player = () => {
    let marker = "X"
    const getMarker = () => marker
    const switchPlayer = () => {
        if(marker === "X") {
            marker = "O"
        } else {
            marker = "X"
        }
        console.log(marker)
    }
    return { marker, switchPlayer, getMarker }
}

const GameBoard = (() => {
    let moves = ["", "", "", "", "", "", "", "", ""]
    const currentPlayer = Player()
    const play = (n) => {
        moves[n] = currentPlayer.getMarker()
        currentPlayer.switchPlayer()
    }
    const render = () => {
        moves.forEach((value, index) => {
            let boxId = `${index.toString()}`
            document.getElementById(boxId).innerHTML = value
        })
    }
    const clearBoard = () => {
        moves = ["", "", "", "", "", "", "", "", ""]
        GameBoard.render()
    }

    return { 
                moves,
                render,
                play, 
                currentPlayer,
                clearBoard
           }
})()

const GamePlay = (() => {
    const makeMove = (n) => {
        GameBoard.play(n)
        GameBoard.render()
    }
    return { makeMove }
})()
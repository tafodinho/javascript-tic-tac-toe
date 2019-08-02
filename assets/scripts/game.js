const Player = () => {
    let marker = "X"
    const getMarker = () => marker
    const switchPlayer = () => {
        if(marker === "X") {
            marker = "O"
        } else {
            marker = "X"
        }
    }
    return { marker, switchPlayer, getMarker }
}

const GameBoard = (() => {
    let moves = ["", "", "", "", "", "", "", "", ""]
    const winningCombination = [
                                    [0,1,2],
                                    [3,4,5],
                                    [6,7,8],
                                    [0,4,8],
                                    [1,2,3],
                                    [0,3,6],
                                    [1,4,7],
                                    [2,5,8],
                                    [2,4,6]
                                ]
    const currentPlayer = Player()
    const play = (n) => {
        moves[n] = currentPlayer.getMarker()
    }
    const putMessage = msg => {
        document.getElementById("message").innerHTML = msg
    }
    const clearMessage = () => {
        document.getElementById("message").innerHTML = ""
    }
    const isValidMove = (i) => {
        if(moves[i] === "") {
            return true
        } else {
            return false
        }
    }
    const render = () => {
        moves.forEach((value, index) => {
            let boxId = `${index.toString()}`
            document.getElementById(boxId).innerHTML = value
        })
    }
    const clearBoard = () => {
        moves = ["", "", "", "", "", "", "", "", ""]
        render()
    }
    const getMoves = () => moves

    return { 
                moves,
                getMoves,
                render,
                play, 
                currentPlayer,
                clearBoard,
                putMessage,
                clearMessage,
                winningCombination, 
                isValidMove
           }
})()

const GamePlay = (() => {
    let finish = false
    const makeMove = (n) => {
        console.log(GameBoard.isValidMove(n))
        if(GameBoard.isValidMove(n)) {
            if(!finish) {
                GameBoard.play(n)
                GameBoard.render()
                const winningString = `Player ${GameBoard.currentPlayer.getMarker()} wins`
                if(isWinner()) {
                    GameBoard.putMessage(winningString)
                } else if (isDraw()) {
    
                }
            }
            GameBoard.currentPlayer.switchPlayer()
        } else {
            GameBoard.putMessage("Play in empty cell")
        }
    }
    const isWinner = () => {
        let counter = 0
        let result = false
        GameBoard.winningCombination.forEach((value, index) => {
            value.forEach((value1, index1) => {
                if(GameBoard.moves[value1] === GameBoard.currentPlayer.getMarker()) {
                    console.log(`${GameBoard.moves[index1]} -> ${GameBoard.currentPlayer.getMarker()}`)
                    counter++
                }
            })
            if(counter === 3) {
                console.log(`Player ${GameBoard.currentPlayer.getMarker()} wins`)
                finish = true
                result = true
                return true
            }
            counter = 0
        })
        return result
    }
    const isDraw = () => {

    }
    const clear = () => {
        GameBoard.clearBoard()
        console.log(GameBoard.getMoves())
        finish = false
    }
    return { 
                makeMove,
                clear
            }
})()
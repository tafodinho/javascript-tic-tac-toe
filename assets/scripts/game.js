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
        if(isEmptyCell(n)) {
            moves[n] = currentPlayer.getMarker()
            clearMessage()
        } else {
            putMessage("select Empty cell")
        }
        
    }
    const putMessage = msg => {
        document.getElementById("message").innerHTML = msg
    }
    const clearMessage = () => {
        document.getElementById("message").innerHTML = ""
    }
    const isEmptyCell = (i) => {
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
    
    const freeze = () => {
        
    }

    return { 
                moves,
                render,
                play, 
                currentPlayer,
                clearBoard,
                putMessage,
                clearMessage,
                winningCombination
           }
})()

const GamePlay = (() => {
    let finish = false
    const makeMove = (n) => {
        GameBoard.play(n)
        GameBoard.render()
        const winningString = `Player ${GameBoard.currentPlayer.getMarker()} wins`
        if(isWinner()) {
            GameBoard.putMessage(winningString)
        } else if (isDraw()) {
            
        }
        GameBoard.currentPlayer.switchPlayer()
    }
    const isWinner = () => {
        let counter = 0
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
                return true
            }
            counter = 0
        })
        return false
    }
    const isDraw = () => {

    }
    return { makeMove }
})()
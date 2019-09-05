let playerName = ""
document.getElementById('player-name').addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        playerName = e.target.value
        e.target.value = ''
        document.getElementById('player').innerHTML = playerName
        Display.putMessage(`Start ${playerName}`)
    }
})

const Player = (() => {
    let playerOject = {name: playerName, marker: 'X'}

    const getMarker = () => playerOject.marker
    const getPlayerName = () => playerOject.name
    const switchPlayer = () => {
        if(playerOject.marker === "X") {
            playerOject.marker = "O"
            playerOject.name = "Player 2"
        } else {
            playerOject.marker = "X"
            playerOject.name = playerName
        }
    }
    return { 
        switchPlayer, 
        getMarker,
        getPlayerName 
    }
})()

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
    const currentPlayer = Player
    const play = (n) => {
        moves[n] = currentPlayer.getMarker()
    }
    
    const isValidMove = (i) => {
        if(moves[i] === "") {
            return true
        } else {
            return false
        }
    }
    
    const getMoves = () => moves

    return { 
                moves,
                getMoves,
                play, 
                currentPlayer,
                winningCombination, 
                isValidMove
           }
})()

const Display = (() => {
    const putMessage = msg => {
        document.getElementById("message").innerHTML = msg
    }
    const clearMessage = () => {
        document.getElementById("message").innerHTML = ""
    }
    const render = () => {
        GameBoard.moves.forEach((value, index) => {
            let boxId = `${index.toString()}`
            document.getElementById(boxId).innerHTML = value
        })
    }
    const clearBoard = () => {
        GameBoard.moves = ["", "", "", "", "", "", "", "", ""]
        render()
    }

    return {
        putMessage,
        clearBoard,
        clearMessage,
        render
    }
})()


const GamePlay = (() => {
    let finished = false
    const makeMove = (n) => {
        if(!finished && playerName !== "") {
            if(GameBoard.isValidMove(n)) {
                GameBoard.play(n)
                Display.render()
                const winningString = `Player ${GameBoard.currentPlayer.getPlayerName()} wins`
                if(isWinner()) {
                    Display.putMessage(winningString)
                    return
                } else if (isDraw()) {
                    Display.putMessage("Draw Game")
                }
                GameBoard.currentPlayer.switchPlayer()
                Display.putMessage(`Next ${GameBoard.currentPlayer.getPlayerName()}`)
            }
            else {
                Display.putMessage("Play in empty cell")
            }
        } 
    }
    const isWinner = () => {
        let counter = 0
        let result = false
        GameBoard.winningCombination.forEach((value, index) => {
            value.forEach((value1, index1) => {
                if(GameBoard.moves[value1] === GameBoard.currentPlayer.getMarker()) {
                    counter++
                }
            })
            if(counter === 3) {
                finished = true
                result = true
                return true
            }
            counter = 0
        })
        return result
    }
    const isDraw = () => {
        let counter = 0
        GameBoard.moves.forEach((value, index) => {
            if(value !== "") {
                counter++
            }
        })
        if(counter === 9) {
            return true
        }
        return false
    }
    const clear = () => {
        Display.clearBoard()
        finish = false
    }
    return { 
                makeMove,
                clear
            }
})()
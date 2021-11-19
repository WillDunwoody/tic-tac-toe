
const gameBoard = (() => {
    let gameArray = ['', '', '', '', '', '', '', '', '']
    return { gameArray }
})()

const players = (name, choice) => {
    return {name, choice}
}

let playerX = players("Will", 'x')
let playerO = players("Tanja", 'o')

const gameController = (() => {
    let roundCount = 0
    let player = playerX.choice

    const playRound = () => {
        if(roundCount == 0 || roundCount % 2 == 0) {
            player = playerO.choice
        } else {
            player = playerX.choice
        }
        checkForWinner()
        roundCount++
    }

    const playerChoice = () => {
        return player 
    }

    const checkForWinner = () => {  
        let winArr = []
        const checkWinArr = () => {
            if(winArr.length === 3) {
                prompt("Winner")
                return
            } else {
                winArr = []
            }
        }

        if(roundCount == 8) {
            prompt("Its a tie")
        } else {
            checkWinArr()   
        }

        const loopBoard = (arr, previous) => {
            let current = arr
            if(arr != '' && current === previous) {
              winArr.push(arr)
            }
            previous = current
          }

        const checkRows = (() => {
            let previous = gameBoard.gameArray[0]
            for(let i = 0; i < 3; i++){
                loopBoard(gameBoard.gameArray[i], previous)
            } 
            checkWinArr()
        
            previous = gameBoard.gameArray[3]
            for(let i = 3; i < 6; i++) {
                loopBoard(gameBoard.gameArray[i], previous)
            }
            checkWinArr()

            previous = gameBoard.gameArray[6]
            for(let i = 6; i < 9; i++) {
                loopBoard(gameBoard.gameArray[i], previous)
            }
            checkWinArr()
        })()

        const checkColumns = (() => {
            let previous = gameBoard.gameArray[0]
            for(let i = 0; i <= 6; i += 3){
                loopBoard(gameBoard.gameArray[i], previous)
            } 
            checkWinArr()
        
            previous = gameBoard.gameArray[1]
            for(let i = 1; i <= 7; i += 3) {
                loopBoard(gameBoard.gameArray[i], previous)
            }
            checkWinArr()

            previous = gameBoard.gameArray[2]
            for(let i = 2; i <= 8; i += 3) {
                loopBoard(gameBoard.gameArray[i], previous)
            }
            checkWinArr()
        })()

        const checkDiagonals = (() => {
            let previous = gameBoard.gameArray[0]
            for(let i = 0; i <= 8; i += 4){
            loopBoard(gameBoard.gameArray[i], previous)
            } 
            checkWinArr()
        
            previous = gameBoard.gameArray[2]
            for(let i = 2; i <= 6; i += 2) {
                loopBoard(gameBoard.gameArray[i], previous)
            }
            checkWinArr()
        })()
    }

    return{ playRound, playerChoice, checkForWinner}

})()

const displayController = (() => {
    
    const gridListener = (() => {
        let gridBox = document.querySelectorAll('.gridBox')     
        gridBox.forEach(element => {
            element.addEventListener('click', function() {
                if(gameController.playerChoice() == 'x') {
                    element.classList.add('blue')
                } else if(gameController.playerChoice() == 'o') {
                    element.classList.add('red')
                }
                gameBoard.gameArray.splice(this.id, 1, gameController.playerChoice())
                gameController.playRound()
                updateDisplay()
            })
        })
    })()

    const updateDisplay = () => {
        for(let val in gameBoard.gameArray) {
            let gridBox = document.getElementById(val)
            gridBox.innerText = gameBoard.gameArray[val]
        }
    }
})()
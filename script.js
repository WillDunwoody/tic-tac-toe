
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
    
        if(roundCount == 8) prompt("Its a tie")

        const checkRows = (() => {
            if(gameBoard.gameArray[0] != '' && gameBoard.gameArray[1] == gameBoard.gameArray[0] && gameBoard.gameArray[2] == gameBoard.gameArray[1] ||
               gameBoard.gameArray[3] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[3] && gameBoard.gameArray[5] == gameBoard.gameArray[4] ||
               gameBoard.gameArray[6] != '' && gameBoard.gameArray[7] == gameBoard.gameArray[6] && gameBoard.gameArray[8] == gameBoard.gameArray[7]) {
                console.log("Winner")
            }
        })()

        const checkColumns = (() => {
            if(gameBoard.gameArray[0] != '' && gameBoard.gameArray[3] == gameBoard.gameArray[0] && gameBoard.gameArray[6] == gameBoard.gameArray[3] ||
               gameBoard.gameArray[1] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[1] && gameBoard.gameArray[7] == gameBoard.gameArray[4] ||
               gameBoard.gameArray[2] != '' && gameBoard.gameArray[5] == gameBoard.gameArray[2] && gameBoard.gameArray[8] == gameBoard.gameArray[5]) {
                console.log("Winner")
            }
        })()

        const checkDiagonals = (() => {
            if(gameBoard.gameArray[0] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[0] && gameBoard.gameArray[8] == gameBoard.gameArray[4] ||
               gameBoard.gameArray[2] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[2] && gameBoard.gameArray[6] == gameBoard.gameArray[4]) {
                console.log("Winner")
            }
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
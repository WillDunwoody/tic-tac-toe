let playerX = ''
let playerO =''

const gameBoard = (() => {
    let gameArray = ['', '', '', '', '', '', '', '', '']
    return { gameArray }
})()

const displayController = (() => {

    const playerListener = (() => {
        let onePlayer = document.getElementById("onePlayer")
        let twoPlayers = document.getElementById("twoPlayers")
        let accept = document.getElementById("accept")
        onePlayer.addEventListener('click', function() {
            console.log("This Works")
        })

        twoPlayers.addEventListener('click', function() {
            document.getElementById("playerNumber").classList.add("deactivate")
            document.getElementById("playerNames").classList.add("active")
            accept.addEventListener('click', function() {
                let playerOneName = document.getElementById("playerOneName").value
                let playerTwoName = document.getElementById("playerTwoName").value
                playerX = players(playerOneName, 'x')
                playerO = players(playerTwoName, 'o')
                document.getElementById("popupForm").classList.remove("active")
                document.getElementById("playerNames").classList.remove("active")
            })
        })

       
    })()
    
    const gridListener = (() => {
        let gridBox = document.querySelectorAll('.gridBox')     
        gridBox.forEach(element => {
            element.addEventListener('click', function() {
                if(gameBoard.gameArray[this.id] != '') return
                if(gameController.playerChoice() == 'x') {
                    element.classList.remove('red')
                    element.classList.add('blue')
                } else if(gameController.playerChoice() == 'o') {
                    element.classList.remove('blue')
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

    return {updateDisplay}
})()

const players = (name, choice) => {
    return {name, choice}
}

const gameController = (() => {
    let roundCount = 0
    let playerName = ''
    let player = 'x'

    const playRound = () => {
        checkForWinner()
        if(roundCount == 0 || roundCount % 2 == 0) {
            player = playerO.choice
            playerName = playerO.name
        } else {
            player = playerX.choice
            playerName = playerX.name
        }
        console.log(roundCount)
        roundCount++
    }

    const playerChoice = () => {
        return playerName, player
    }

    const checkForWinner = () => {  

        if(gameBoard.gameArray[0] != '' && gameBoard.gameArray[1] == gameBoard.gameArray[0] && gameBoard.gameArray[2] == gameBoard.gameArray[1] ||
           gameBoard.gameArray[3] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[3] && gameBoard.gameArray[5] == gameBoard.gameArray[4] ||
           gameBoard.gameArray[6] != '' && gameBoard.gameArray[7] == gameBoard.gameArray[6] && gameBoard.gameArray[8] == gameBoard.gameArray[7] ||
           gameBoard.gameArray[0] != '' && gameBoard.gameArray[3] == gameBoard.gameArray[0] && gameBoard.gameArray[6] == gameBoard.gameArray[3] ||
           gameBoard.gameArray[1] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[1] && gameBoard.gameArray[7] == gameBoard.gameArray[4] ||
           gameBoard.gameArray[2] != '' && gameBoard.gameArray[5] == gameBoard.gameArray[2] && gameBoard.gameArray[8] == gameBoard.gameArray[5] ||
           gameBoard.gameArray[0] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[0] && gameBoard.gameArray[8] == gameBoard.gameArray[4] ||
           gameBoard.gameArray[2] != '' && gameBoard.gameArray[4] == gameBoard.gameArray[2] && gameBoard.gameArray[6] == gameBoard.gameArray[4]) {
            document.getElementById("popupForm").classList.add("active")
            document.getElementById("declareWinner").classList.add("active")
            document.getElementById("playerWinner").innerText = playerName
        } else if (roundCount === 8) {
            document.getElementById("popupForm").classList.add("active")
            document.getElementById("declareWinner").classList.add("active")
            document.getElementById("playerWinner").innerText = "It's a tie!"
        }
    }
    
    const restartGame = (() => {
        let playAgain = document.getElementById("playAgain")
        playAgain.addEventListener("click", function() {
            document.getElementById("popupForm").classList.remove("active")
            document.getElementById("declareWinner").classList.remove("active")
            gameBoard.gameArray = ['', '', '', '', '', '', '', '', '']
            roundCount = 0
            player = playerX.choice
            displayController.updateDisplay()
        })
    })()

    return{ playRound, playerChoice, checkForWinner, roundCount}

})()
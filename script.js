let playerX = ''
let playerO =''

const gameBoard = (() => {
    let gameArray = ['', '', '', '', '', '', '', '', '']
    return { gameArray }
})()

const players = (name, choice) => {
    return {name, choice}
}

const displayController = (() => {

    const playerListener = (() => {
        let onePlayer = document.getElementById("onePlayer")
        let twoPlayers = document.getElementById("twoPlayers")
        let accept = document.getElementById("accept")
        onePlayer.addEventListener('click', function() {
            console.log("This Works")
        })

        twoPlayers.addEventListener('click', function() {
            document.getElementById("amountOfPlayers").classList.add("deactivate")
            document.getElementById("playerNames").classList.add("active")
            accept.addEventListener('click', function() {
                let playerOneName = document.getElementById("playerOneName").value
                let playerTwoName = document.getElementById("playerTwoName").value
                playerX = players(playerOneName, 'x')
                playerO = players(playerTwoName, 'o')
                document.getElementById("popupForm").classList.remove("active")
                document.getElementById("playerNames").classList.remove("active")
                document.getElementById("firstPlayer").classList.add("active")
                document.getElementById("firstPlayerName").innerText = playerOneName
                document.getElementById("secondPlayer").classList.add("active")
                document.getElementById("secondPlayerName").innerText = playerTwoName
            })
        })

       
    })()
    
    const gridListener = (() => {
        let gridBox = document.querySelectorAll('.gridBox')     
        gridBox.forEach(element => {
            element.addEventListener('click', function() {
                if(gameBoard.gameArray[this.id] != '') return
                gameBoard.gameArray.splice(this.id, 1, gameController.playerChoice())
                gameController.playRound()
                updateDisplay()
            })
        })
    })()

    const updateDisplay = () => {
        for(let val in gameBoard.gameArray) {
            let gridBox = document.getElementById(val)
            if(gameBoard.gameArray[val] === 'x') {
                gridBox.classList.add('tic-tac')
            } else if(gameBoard.gameArray[val] === 'o') {
                gridBox.classList.add('toe')
            } else if(gameBoard.gameArray[val] === '') {
                gridBox.classList.remove('tic-tac')
                gridBox.classList.remove('toe')
            }
        }
    }

    return {updateDisplay}
})()

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
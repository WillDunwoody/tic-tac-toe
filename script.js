
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
    let player = ''

    const playRound = () => {
        
        if(roundCount % 2 == 0) {
            player = playerX.choice
        } else {
            player = playerO.choice
        }
        roundCount++
    }

    const playerChoice = () => {
        return player 
    }

    return{ playRound, playerChoice }

})()

const displayController = (() => {
    
    const gridListener = (() => {
        let gridBox = document.querySelectorAll('.gridBox')
        
        gridBox.forEach(element => {
            element.addEventListener('click', function() {
                if(gameBoard.gameArray[this.id] != '') return
                if(gameController.playerChoice() == 'x') {
                    element.classList.add('blue')
                } else if(gameController.playerChoice() == 'o') {
                    element.classList.add('red')
                }
                gameBoard.gameArray.splice(this.id, 1, gameController.playerChoice())
                gameController.playRound()
                updateBoard()
            })
        })
    })()

    const updateBoard = () => {
        for(let val in gameBoard.gameArray) {
            let gridBox = document.getElementById(val)
            gridBox.innerText = gameBoard.gameArray[val]
        }
    }
})()
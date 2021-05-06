"use strict"

const game = (() => {
    const displayWinner = document.querySelector('#winner');

    function createBoard() {
        displayWinner.textContent = 'Score';
        const _board = Array.from({ length: 9 }, (x, i) => i);
        const _divGame = document.querySelector('#game');
        _divGame.innerHTML = '';
        let i = 0;
        while (i < _board.length) {
            const divCell = document.createElement('div');
            divCell.setAttribute('id', i);
            divCell.className = 'cell';
            _divGame.appendChild(divCell);
            i++;
        }
    }

    const restartGame = document.querySelector('#restart');
    restartGame.addEventListener('click', () => {
        gameController.restartTheGame();
    })

    createBoard();

    return {
        createBoard,
        displayWinner,
    }
})();



const players = (() => {
    function CreatePlayer(name, color, marker) {
        this.name = name;
        this.color = color;
        this.marker = marker;
    }

    const playerOne = new CreatePlayer('Player X', 'Red', 'X');
    const playerTwo = new CreatePlayer('Player O', 'Blue', 'O');

    document.querySelector('form').reset()
    document.querySelector('#playerName').addEventListener('change', (e) => {
        playerOne.name = e.target.value;
    })

    return {
        playerOne,
        playerTwo,
    }
})();



const gameController = (() => {
    let _currentPlayer = players.playerOne;
    let result;

    // Listens for any click on the board.
    function _playerMoveListeners() {
        const board = document.querySelectorAll('.cell');
        board.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (_markCell(cell)) {
                    if (_checkForWinner(board)) {
                        game.displayWinner.textContent = result;
                    } else {
                        _switchPlayer();
                        playerAI.makeMoveAI(board, _currentPlayer);
                        if (_checkForWinner(board)) {
                            game.displayWinner.textContent = result;
                        }
                        _switchPlayer();
                    }
                }
            })
        });
    }

    /* Removes attached event listeners without clearing the board.
    Will probably get obsolete when I make decent CSS styling, animations and UI.
    It's needed for now in case player clicks cancel on win confirmation box*/
    function _stopListeningForPlayerMove() {
        const currentBoard = document.querySelector('#game');
        let boardClone = currentBoard.cloneNode(true);
        currentBoard.parentNode.replaceChild(boardClone, currentBoard);
    }

    // Marks cell with current players marker and color. Throws error if cell is taken.
    function _markCell(cell) {
        if (cell.textContent == '') {
            cell.textContent = _currentPlayer.marker;
            cell.style.color = _currentPlayer.color;
            return true;
        } else {
            alert('Cell is already marked, choose another one.');
            return false;
        }
    }

    // Switches current player after making move.
    function _switchPlayer() {
        if (_currentPlayer == players.playerOne) {
            _currentPlayer = players.playerTwo;
        } else {
            _currentPlayer = players.playerOne;
        }
    }

    // Takes the current board text content from every cell and checks win conditions.
    function _checkForWinner(board) {
        let array = [];
        board.forEach(ele => {
            array.push(ele.textContent);
        })
        if (_checkRows(array) || _checkColumns(array) || _checkDiagonals(array)) {
            _stopListeningForPlayerMove()
            return result = _currentPlayer.name + ' has won.';
        } else if (_checkForDraw(array)) {
            _stopListeningForPlayerMove()
            return result = 'It\'s a draw.';
        }
    }

    // Checks if any player got a winning row.
    function _checkRows(row) {
        for (let i = 0; i < 3; i++) {
            let arr = [];
            for (let j = i * 3; j < i * 3 + 3; j++) {
                arr.push(row[j]);
            }
            if (arr.every(mark => mark == _currentPlayer.marker)) {
                return true;
            }
        }
    }

    // Checks if any player got a winning column.
    function _checkColumns(col) {
        for (let i = 0; i < 3; i++) {
            let arr = [];
            for (let j = 0; j < 3; j++) {
                arr.push(col[j * 3 + i]);
            }
            if (arr.every(mark => mark == _currentPlayer.marker)) {
                return true;
            }
        }
    }

    // Checks if any player got a winning diagonal.
    function _checkDiagonals(diag) {
        let diagonalOne = [diag[0], diag[4], diag[8]];
        let diagonalTwo = [diag[2], diag[4], diag[6]];
        if (diagonalOne.every(mark => mark == _currentPlayer.marker || 
            diagonalTwo.every(mark => mark == _currentPlayer.marker))) {
                return true;
        }
    }

    function _checkForDraw(draw) {
        if (draw.every(mark => mark !== '')) {
            return true;
        }
    }

    // Self-explanatory (or not?).
    function restartTheGame() {
        game.createBoard();
        _playerMoveListeners();
    }
    
    _playerMoveListeners();

    return {
        restartTheGame,
    }
})();



const playerAI = (() => {
    function makeMoveAI(board, currentPlayer) {
        let i;
        do {
            i = Math.floor(Math.random() * board.length);
        } while (!board[i].textContent == '')
        board[i].textContent = currentPlayer.marker;
        board[i].style.color = currentPlayer.color;
    }

    return {
        makeMoveAI,
    }
})();

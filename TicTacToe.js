const gameboard = (() => {
    const _board = Array.from({ length: 9 }, (x, i) => i);
    const _divGame = document.querySelector('#game');
    function createBoard() {
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

    const resetGame = document.querySelector('#reset');
    resetGame.addEventListener('click', () => {
        gameController.resetTheGame();
    })

    createBoard();

    return {
        createBoard,
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

    return {
        playerOne,
        playerTwo
    }
})();



const gameController = (() => {
    let _currentPlayer = players.playerOne;

    function _listenForPlay() {
        const board = document.querySelectorAll('.cell');
        board.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (_markCell(cell)) {
                    checkForWinner(board);
                    _switchPlayer();
                }
            })
        });
    }

    _listenForPlay();

    function _stopListeningForPlay() {
        const currentBoard = document.querySelector('#game');
        boardClone = currentBoard.cloneNode(true);
        currentBoard.parentNode.replaceChild(boardClone, currentBoard);
    }

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

    function _switchPlayer() {
        if (_currentPlayer == players.playerOne) {
            _currentPlayer = players.playerTwo;
        } else {
            _currentPlayer = players.playerOne;
        }
    }

    function checkForWinner(board) {
        const array = [];
        board.forEach(ele => {
            array.push(ele.textContent);
        })
        if (_checkRows(array) || _checkColumns(array) || _checkDiagonals(array)) {
            if (confirm(_currentPlayer.name + ' has won. Restart the game?')) {
                resetTheGame();
            } else {
                _stopListeningForPlay();
            }
        }
    }

    function _checkRows(row) {
        for (let i = 0; i < 3; i++) {
            let arr = [];
            for (let j = i * 3; j < i * 3 + 3; j++) {
                arr.push(row[j]);
            }
            if (arr.every(mark => mark == _currentPlayer.marker)) {
                alert(5);
            }
        }
    }

    function _checkColumns(col) {
        for (let c = 0; c < 3; c++) {
            if (col[c] == 'X' && col[c + 3] == 'X' && col[c + 6] == 'X') {
                return true;
            }
            if (col[c] == 'O' && col[c + 3] == 'O' && col[c + 6] == 'O') {
                return true;
            }
        }
    }

    function _checkDiagonals(diag) {
        if (diag[0] == 'X' && diag[4] == 'X' && diag[8] == 'X') {
            return true;
        }
        if (diag[0] == 'O' && diag[4] == 'O' && diag[8] == 'O') {
            return true;
        }
        if (diag[2] == 'X' && diag[4] == 'X' && diag[6] == 'X') {
            return true;
        }
        if (diag[2] == 'O' && diag[4] == 'O' && diag[6] == 'O') {
            return true;
        }
    }

    function resetTheGame() {
        gameboard.createBoard();
        _listenForPlay();
    }
    
    return {
        resetTheGame,
    }
})();




/* Old code. Misunderstood the instructions and made everything inside 
one single module.

const game = (function() {
    function createBoard() {
        const gameboard = Array.from({length: 9}, (x, i) => i);
        const divGame = document.querySelector('#game');
        divGame.innerHTML = '';
        let i = 0;
        while (i < gameboard.length) {
            const divCell = document.createElement('div');
            divCell.setAttribute('id', i);
            divCell.className = 'cell';
            divGame.appendChild(divCell);
            i++;
        }
    }

    function CreatePlayer(name, color, marker) {
        this.name = name;
        this.color = color;
        this.marker = marker;
    }

    const playerOne = new CreatePlayer('Player X', 'Red', 'X');
    const playerTwo = new CreatePlayer('Player O', 'Blue', 'O');
    let currentPlayer = playerOne;

    function resetTheGame() {
        createBoard();
        listenForPlay();
    }

    const resetGame = document.querySelector('#reset');
    resetGame.addEventListener('click', () => {
        resetTheGame();
    })

    function listenForPlay() {
        const board = document.querySelectorAll('.cell');
        board.forEach((cell) => {
            cell.addEventListener('click', () => {
                markCell(cell);
                checkForWinner(board);
                switchPlayer();
            })
        });
    }

    function stopListeningForPlay() {
        const board = document.querySelector('#game');
        boardClone = board.cloneNode(true);
        board.parentNode.replaceChild(boardClone, board);
    }

    function markCell(cell) {
        if (cell.textContent == '') {
            cell.textContent = currentPlayer.marker;
            cell.style.color = currentPlayer.color;
        } else {
            alert('Cell is already marked, choose another one.');
        }
    }

    function checkForWinner(board) {
        const array = [];
        board.forEach(ele => {
            array.push(ele.textContent);
        })
        if (checkRows(array) || checkColumns(array) || checkDiagonals(array)) {
            if (confirm(currentPlayer.name + ' has won. Restart the game?')) {
                resetTheGame();
            } else {
                stopListeningForPlay();
            }
        }
    }

    function checkRows(row) {
        for (let r = 0; r < 9; r += 3) {
            if (row[r] == 'X' && row[r + 1] == 'X' && row[r + 2] == 'X') {
                return true;
            }
            if (row[r] == 'O' && row[r + 1] == 'O' && row[r + 2] == 'O') {
                return true;
            }
        }
    }

    function checkColumns(col) {
        for (let c = 0; c < 3; c++) {
            if (col[c] == 'X' && col[c + 3] == 'X' && col[c + 6] == 'X') {
                return true;
            }
            if (col[c] == 'O' && col[c + 3] == 'O' && col[c + 6] == 'O') {
                return true;
            }
        }
    }

    function checkDiagonals(diag) {
        if (diag[0] == 'X' && diag[4] == 'X' && diag[8] == 'X') {
            return true;
        }
        if (diag[0] == 'O' && diag[4] == 'O' && diag[8] == 'O') {
            return true;
        }
        if (diag[2] == 'X' && diag[4] == 'X' && diag[6] == 'X') {
            return true;
        }
        if (diag[2] == 'O' && diag[4] == 'O' && diag[6] == 'O') {
            return true;
        }
    }

    function switchPlayer() {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    resetTheGame();

    return {
        checkForPlay: listenForPlay,
    }
})();
*/
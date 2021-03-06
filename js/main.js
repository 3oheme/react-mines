var React = require('react');

var SquareItem = require('./squareitem.js');

var Information = require('./information.js');
var Board = require('./board.js');
var MessageBar = require('./messagebar.js');

var Game = React.createClass({

    config: {
        board_size: 8,
        bombs: 18
    },

    _getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    setUpBoard: function(pos_x, pos_y) {
        var new_board = this.state.board;
        // place bombs randomly, but avoiding first click position
        for (var i = 0; i < this.config.bombs;) {
            var x = this._getRandomInt(0, this.config.board_size -1);
            var y = this._getRandomInt(0, this.config.board_size -1);
            if (x !== pos_x && y !== pos_y && new_board[x][y].bomb === false) {
                new_board[x][y].bomb = true;
                i++;
            }
        }
        // update square content with neighbor number
        for (var i = 0; i < this.config.board_size; i++) {
            for (var j = 0; j < this.config.board_size; j++) {
                var count = 0;
                for (var left = -1; left < 2; left++) { 
                    for (var top = -1; top < 2; top++) { 
                        if (i + left >= 0 && i + left < this.config.board_size && j + top >= 0 && j + top < this.config.board_size) {
                            count = count + (new_board[i+left][j+top].bomb ? 1 : 0);
                        }
                    }
                }
                new_board[i][j].number = count;
            }
        }
        return new_board;
    },

    _handleNewGameClick: function(e) {
        e.preventDefault();
        this.setState({
            board: this._createEmptyNxNBoard(this.config.board_size),
            board_init: false,
            flags: this.config.bombs,
            message: 'tryagain'
        });
    },

    _handleSquareClick: function(e, item, right_click) {
        e.preventDefault();

        // first click on the board
        if (this.state.board_init === false ) {
            var new_board = this.setUpBoard(item.pos_x, item.pos_y);
            this.setState({
                board: new_board,
                board_init: true
            });
        }

        var new_board = this.state.board;

        // place a flag
        if (right_click) {
            if (new_board[item.pos_x][item.pos_y].revealed === false) {
                if (new_board[item.pos_x][item.pos_y].flag) {
                    new_board[item.pos_x][item.pos_y].flag = false;
                    this.setState({
                        board: new_board,
                        flags: this.state.flags + 1,
                        message: 'removeflag'
                    });
                }
                else if (this.state.flags > 0) {
                    new_board[item.pos_x][item.pos_y].flag = true;
                    this.setState({
                        board: new_board,
                        flags: this.state.flags - 1,
                        message: 'addflag'
                    });
                }
            }
        }

        // reveal under a square
        else {
            if (new_board[item.pos_x][item.pos_y].bomb) {
                this._gameOver();
                return;
            }
            else if (new_board[item.pos_x][item.pos_y].revealed === false) {
                // in case we revealed a 0, we need to reveal also all 0 neighbours
                if (new_board[item.pos_x][item.pos_y].number === 0) {
                    new_board = this._revealZeroNeighbours(new_board, item.pos_x, item.pos_y);
                }
                else {
                    new_board[item.pos_x][item.pos_y].revealed = true;
                }
                this.setState({
                    board: new_board,
                    message: 'reveal'
                });
            }
        }

        if (this._hasUserWon(new_board)) {
            this.setState({
                message: 'win'
            });
        }
    },

    _revealZeroNeighbours: function(board, x, y) {
        board[x][y].revealed = true;
        for (var left = -1; left < 2; left++) { 
            for (var top = -1; top < 2; top++) {
                if (x + left >= 0 && x + left < this.config.board_size && y + top >= 0 && y + top < this.config.board_size) {
                    if (board[x+left][y+top].revealed === false) {
                        board[x+left][y+top].revealed = true;
                        if (board[x+left][y+top].number === 0) {
                            board = this._revealZeroNeighbours(board, x+left, y+top);
                        }
                    }
                }
            }
        } 
        return board;
    },

    _hasUserWon: function(new_board) {
        var size = this.config.board_size;
        var win = true;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (new_board[i][j].revealed || (new_board[i][j].bomb && new_board[i][j].flag)) {
                    win = win && true;
                }
                else {
                    win = false;
                }
            }
        }
        return win;
    },

    _gameOver: function() {
        var new_board = this.state.board;
        var size = this.config.board_size;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                new_board[i][j].revealed = true;
            }
        }
        this.setState({
            board: new_board,
            flags: this.config.bombs,
            message: 'gameover'
        });
    },

    _createEmptyNxNBoard: function(size) {
        var board = new Array(size);
        for (var i = 0; i < size; i++) {
            board[i] = new Array(size);
            for (var j = 0; j < size; j++) {
                board[i][j] = new SquareItem("id" + i + "-" + j, 'empty');
            }
        }
        return board;
    },

    getInitialState: function() {
        return({
            board: this._createEmptyNxNBoard(this.config.board_size),
            board_init: false,
            flags: this.config.bombs,
            message: 'welcome'
        });
    },

    render: function() {
        return (
            <div>
                <Information flags={this.state.flags} action={this._handleNewGameClick} />
                <Board board={this.state.board} action={this._handleSquareClick} board_size={this.config.board_size} />
                <MessageBar message={this.state.message} />
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('content'));

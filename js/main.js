var React = require('react');

var Information = require('./information.js');
var Board = require('./board.js');

var SquareItem = function(id, value) {
    this.key = id;
    this.number = value;
    this.revealed = false;
    this.bomb = false;
}

var Game = React.createClass({

    config: {
        board_size: 8,
        bombs: 30
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    setUpBoard: function(pos_x, pos_y) {
        var new_board = this.state.board;
        // place bombs randomly, but avoiding first click position
        for (var i = 0; i < this.config.bombs;) {
            var x = this.getRandomInt(0, this.config.board_size -1);
            var y = this.getRandomInt(0, this.config.board_size -1);
            if (x != pos_x && y != pos_y) {
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

    _handleClick: function(e, item) {
        e.preventDefault();
        if (this.state.board_init == false ) {
            var new_board = this.setUpBoard(item.pos_x, item.pos_y);
            this.setState({
                board: new_board,
                board_init: true
            });
        }

        var new_board = this.state.board;
        new_board[item.pos_x][item.pos_y].revealed = !this.state.board[item.pos_x][item.pos_y].revealed;
        this.setState({
            board: new_board
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
        });
    },

    render: function() {
        return (
            <div>
                <Information />
                <Board board={this.state.board} action={this._handleClick} board_size={this.config.board_size} />
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('content'));

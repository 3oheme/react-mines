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
        bombs: 8
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    setUpBoard: function(pos_x, pos_y) {
        var new_board = this.state.board;
        // place bombs randomly
        for (var i = 0; i < this.config.bombs; i++) {
            var x = this.getRandomInt(0, this.config.board_size -1);
            var y = this.getRandomInt(0, this.config.board_size -1);
            new_board[x][y].bomb = true;
        }
        // update square content
        for (var i = 0; i < this.config.board_size; i++) {
            for (var j = 0; j < this.config.board_size; j++) {
                var count = 0;

                for (var left = -1; left < 2; left++) { 
                    for (var top = -1; top < 2; top++) { 
                        if (i + left >= 0 && i + left < this.config.board_size && j + top >= 0 && j + top < this.config.board_size) {
                            // console.log("i:" + i + " - i+left" + (i+left) + " - j:" + j + " - j+top" + (j+top));
                            count = count + (new_board[i+left][j+top].bomb ? 1 : 0);
                        }
                    }
                }

                new_board[i][j].number = count;
            }
        }
        console.log(new_board);
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
                <p>this is the game wrapper</p>
                <Information />
                <Board board={this.state.board} action={this._handleClick} board_size={this.config.board_size} />
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('content'));

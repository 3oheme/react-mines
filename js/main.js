var React = require('react');

var Information = require('./information.js');
var Board = require('./board.js');

var SquareItem = function(id, value) {
    this.key = id;
    this.value = value;
    this.revealed = false;
}

var Game = React.createClass({

    config: {
        board_size: 8
    },

    _handleClick: function(e, item) {
        e.preventDefault();
        var new_board = this.state.board;
        new_board[item.pos_x][item.pos_y].revealed = !this.state.board[item.pos_x][item.pos_y].revealed;
        this.setState({
            board: new_board
        });
    },

    _createNxNBoard: function(size) {
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
            board: this._createNxNBoard(this.config.board_size)
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

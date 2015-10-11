var React = require('react');

var Information = require('./information.js');
var Board = require('./board.js');

var Game = React.createClass({
    config: {
        board_size: 8
    },
    getInitialState: function() {
        var new_board = new Array(this.config.board_size);
        for (var i = 0; i < this.config.board_size; i++) {
            new_board[i] = new Array(this.config.board_size);
            for (var j = 0; j < this.config.board_size; j++) {
                new_board[i][j] = 'empty';
            }
        }
        return({
            board: new_board
        });
    },
    render: function() {
        return (
            <div>
                <p>this is the game wrapper</p>
                <Information />
                <Board board={this.state.board} board_size={this.config.board_size} />
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('content'));

var React = require('react');

var Information = require('./information.js');
var Board = require('./board.js');

var Game = React.createClass({
    render: function() {
        return (
            <div>
                <p>this is the game wrapper</p>
                <Information />
                <Board />
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('content'));

var React = require('react');

var Square = require('./square.js');

module.exports = React.createClass({

    render: function() {
        var rows = Array(this.props.board_size);
        for (var i = 0; i < this.props.board_size; i++) {
            rows[i] = []
            for (var j = 0; j < this.props.board_size; j++) {
                rows[i].push(<Square key={this.props.board[i][j].id} status={this.props.board[i][j].status} />)
            }
        }
        return (
            <div>
                {
                    rows.map(function(row) {
                        return(<div className="row">{row}</div>);
                    })
                }
            </div>
        );
    }
});

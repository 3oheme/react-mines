var React = require('react');

var Square = require('./square.js');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="board">
                {this.props.board.map(function(row, index_x) {
                    return (
                        <div className="board--row" key={index_x}>
                            {row.map(function(item, index_y) {
                                return (<Square key={item.key} pos_x={index_x} pos_y={index_y} action={this.props.action} id={item.key} item={item} />);
                            }, this)}
                        </div>
                    )
                }, this)}
            </div>
        );
    }
});

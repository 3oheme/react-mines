var React = require('react');

var Square = require('./square.js');

module.exports = React.createClass({

    render: function() {
        return (
            <div>
                {this.props.board.map(function(row, index) {
                    return (
                        <div key={index}>
                            {row.map(function(item) {
                                return (<Square key={item.key} status={item.status} />);
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
});

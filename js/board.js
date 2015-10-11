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
                                return (<Square key={item.key} action={this.props.action} id={item.key} status={item.status} />);
                            }, this)}
                        </div>
                    )
                }, this)}
            </div>
        );
    }
});

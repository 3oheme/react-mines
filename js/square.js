var React = require('react');

module.exports = React.createClass({
    render: function() {
        if (this.props.status == 'empty') {
            return (
                <span className={this.props.name}>[ ]</span>
            );
        }
        else {
            return (
                <span className={this.props.name}>[x]</span>
            );
        }
    }
});

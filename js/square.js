var React = require('react');

module.exports = React.createClass({
    render: function() {
        if (this.props.status == 'empty') {
            return (
                <span className={this.props.key}>[ ]</span>
            );
        }
        else {
            return (
                <span className={this.props.key}>[x]</span>
            );
        }
    }
});

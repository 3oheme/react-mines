var React = require('react');

module.exports = React.createClass({
    render: function() {
        if (this.props.status == 'empty') {
            return (
                <span className="square">[ ]</span>
            );
        }
        else {
            return (
                <span className="square">[x]</span>
            );
        }
    }
});

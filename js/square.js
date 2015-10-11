var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({

    _handleClick: function(e) {
        this.props.action(e, this.props.id);
    },

    render: function() {
        var classes = classNames('square');
        var body = (this.props.status == 'empty') ? '[ ]' : '[x]'

        return(
            <span onClick={this._handleClick} className={classes}>{body}</span>
        );

    }
});

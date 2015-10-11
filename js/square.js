var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({

    _handleClick: function(e) {
        this.props.action(e, this.props);
    },

    render: function() {
        var classes = classNames('square');
        var body = (this.props.item.revealed) ? '[_]' : '[x]'

        return(
            <span onClick={this._handleClick} className={classes}>{body}</span>
        );

    }
});

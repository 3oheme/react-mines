var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({

    flag: 'F',
    bomb: 'B',
    hidden: '-',

    _handleClick: function(e) {
        this.props.action(e, this.props);
    },

    render: function() {
        var classes = classNames(
            'square',
            (this.props.item.revealed) ? 'revealed' : 'hidden',
            (!this.props.item.bomb) ? ('number-'+ this.props.item.number) : ''
            );
        var content = (this.props.item.bomb) ? this.bomb : this.props.item.number;
        var body = (this.props.item.revealed) ? content : this.hidden;

        return(
            <span onClick={this._handleClick} className={classes}>{body}</span>
        );

    }
});

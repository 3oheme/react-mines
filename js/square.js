var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({

    flag: 'F',
    bomb: 'B',
    hidden: ' ',

    _handleLeftClick: function(e) {
        this.props.action(e, this.props);
    },

    _handleRightClick: function(e) {
        this.props.action(e, this.props, true);
    },

    render: function() {
        var classes = classNames(
            'square',
            (this.props.item.revealed) ? 'revealed' : 'hidden',
            (!this.props.item.bomb) ? ('number-'+ this.props.item.number) : 'bomb'
            );

        var body = '';

        if (this.props.item.revealed) {
            if (this.props.item.bomb) {
                body = this.bomb;
            }
            else {
                body = this.props.item.number;
            }
        }
        
        else if (this.props.item.flag) {
            body = this.flag;
        }
        else {
            body = this.hidden;
        }

        return(
            <span onClick={this._handleLeftClick} onContextMenu={this._handleRightClick} className={classes}>{body}</span>
        );

    }
});

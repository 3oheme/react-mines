var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="header-menu">
                <span>Flags: {this.props.flags}</span> — 
                <button onClick={this.props.action}>New game</button>
            </div>
        );
    }
});

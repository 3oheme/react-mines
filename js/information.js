var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="header-menu">
                <span className="header-menu--flags">Flags available: {this.props.flags}</span>
                <button className="header-menu--restart"onClick={this.props.action}>New game</button>
            </div>
        );
    }
});

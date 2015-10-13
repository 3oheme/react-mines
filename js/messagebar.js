var React = require('react');

module.exports = React.createClass({

    messages: {

        'welcome': [
            'Welcome, human'
        ],

        'reveal': [
            'Don\'t be afraid, human',
            'Good try, human'
        ],

        'addflag': [
            'You think it\'s going well, human',
            'Flags will save you, human',
            'Are you sure?',
            'That doesn\'t look like a bomb, human',
            'I\'m afraid you are failing again, human'
        ],

        'removeflag': [
            'I knew you are not sure, poor human',
            'Doub is a human feeling'
        ],

        'gameover': [
            'Really? I thought you could do better. I was wrong, human'
        ],
    },

    randomMessage: function(type) {
        return this.messages[type][Math.floor(Math.random()*this.messages[type].length)];
    },

    render: function() {
        return (
            <div className="message-bar">
                <p>{this.randomMessage(this.props.message)}</p>
            </div>
        );
    }
});

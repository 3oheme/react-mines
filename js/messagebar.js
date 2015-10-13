var React = require('react');

module.exports = React.createClass({

    messages: {

        'welcome': [
            'Welcome on board, human',
            'I hope you do better than the previous one'
        ],

        'reveal': [
            'Don\'t be afraid, human',
            'Good try, human',
            'Going well',
            'Nice',
            'Good',
            'Meh',
            'Well done',
            'Ok',
            'So far so good',
            'That\'s something',
        ],

        'addflag': [
            'You\'re probably wrong again, human',
            'Flags will save you, human',
            'Are you sure?',
            'That doesn\'t look like a bomb, human',
            'There? sure?',
            'Oh, dear'
        ],

        'removeflag': [
            'I knew you are not sure, poor human',
            'Doubt is a human feeling',
            'Come on, human'
        ],

        'gameover': [
            'BOOM! Really? I thought you could do better. I was wrong, human',
            'You are a failure, human',
            'You lose. As usual'
        ],

        'tryagain': [
            'Try again, you poor human',
            'Try again, you disgrace',
            'Yes, try again, why not'
        ],

        'win': [
            'Yay. You are pretty awesome, human',
            'You should be terribly proud, human',
            'Not bad. My Z80 also resolved it a couple of minutes ago'
        ],
    },

    randomMessage: function(type) {
        return this.messages[type][Math.floor(Math.random()*this.messages[type].length)];
    },

    render: function() {
        return (
            <div className="message-bar">
                <p>&gt; {this.randomMessage(this.props.message)}</p>
            </div>
        );
    }
});

import React, { Component } from 'react';
import './Message.css';

const adorableURL = "https://api.adorable.io/avatars/";
const imgSize = 64;

class Message extends Component {
    render(){
        let randomImage = adorableURL + imgSize + "/" + this.props.author + ".png";
        return (
            <div className="message">
                <div className="message-item">
                    <img className="message-img" src={randomImage} alt="profile pic" />
                </div>
                <div className="message-item">
                    <p><b>@{this.props.author}</b> <span>{new Date(this.props.timestamp).toTimeString()}</span></p>
                    <p>{this.props.message}</p>
                </div>
            </div>
        );
    }
}

export default Message;
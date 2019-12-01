import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      name: "J Bruin",
      message: ""
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  }

  createMessage = () => {
    let newMessage = {
      name: this.state.name,
      message: this.state.message
    };
    let newMessages = this.state.messages;
    newMessages.push(newMessage)
    this.setState({messages: newMessages});
  }

  renderMessages = () => {
    if (this.state.messages.length === 0){
      return (<div> it's empty. why not say something? </div>);
    }
    let messages = [];
    this.state.messages.forEach((element, i) => {
      messages.push(
        <div key={i} className="message">
          <p><span>{element.name}</span> said:</p>
          <p>{element.message}</p>
        </div>
      );
    });
    return (<div className="messages-container">{messages}</div>);
  }

  render(){
    return (
      <div className="App">
        <header className="header-text">match</header>
        <div className="message-box">
          <input 
            className="text-input"
            value={this.state.Name} 
            onChange={this.handleNameChange.bind(this)}
            type="text"
            placeholder="your name..."
          />
          <input 
            className="text-input"
            value={this.state.message} 
            onChange={this.handleMessageChange.bind(this)}
            type="text" 
            placeholder="your message..." 
          />
          <button onClick={this.createMessage}>send</button>
        </div>
        <hr />
        {this.renderMessages()}
      </div>
    );
  }
}

export default App;

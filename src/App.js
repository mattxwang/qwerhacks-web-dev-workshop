import React, { Component } from 'react';
import './App.css';

import firebase from './lib/firebase.js';

import Message from './components/Message/Message';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      name: "J Bruin",
      message: ""
    };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.unsubscribe = this.db.collection("messages")
    .orderBy("timestamp", "desc").onSnapshot((collection) => {
      let newMessagesList = [];
      collection.forEach(function(doc){
        let message = doc.data();
        let newMessage = {
          name: message.name,
          message: message.message,
          timestamp: message.timestamp
        }
        newMessagesList.push(newMessage);
      });
      this.setState({
        messages: newMessagesList
      });
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
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
      message: this.state.message,
      timestamp: Date.now()
    };
    let newMessages = this.state.messages;
    newMessages.push(newMessage)
    this.setState({messages: newMessages});

    this.db.collection("messages").add(newMessage)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  
  }

  renderMessages = () => {
    if (this.state.messages.length === 0){
      return (<div> it's empty. why not say something? </div>);
    }
    let messages = [];
    this.state.messages.forEach((element, i) => {
      messages.push(
        <Message 
          key={i}
          author={element.name}
          message={element.message}
          timestamp={element.timestamp}
        />
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

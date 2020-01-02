import React from 'react';
import './App.css';
import Message from './components/Message';
import firebase from './lib/firebase.js';

const getTimeString = timestamp => {
  let date = new Date(timestamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  // 0 padding!
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  let str = hour + ":" + min + ":" + sec + " on " + month + "/" + day + "/" + date.getFullYear();
  return str;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        messages: [],
        author: "Anonymous",
        message: "your message..."
    };
  }
  componentDidMount = () => {
    this.db = firebase.firestore();
    this.unsubscribe = this.db.collection("messages")
    .orderBy("timestamp", "desc").onSnapshot((collection) => {
      let newMessagesList = [];
      collection.forEach(function(doc){
        let message = doc.data();
        let newMessage = {
          author: message.author,
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
  componentWillUnmount = () => {
    this.unsubscribe();
  }
  handleAuthorChange = e => {
    this.setState({ author: e.target.value });
  }

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  }
  createMessage = () => {
    let newMessage = {
      author: this.state.author,
      message: this.state.message,
      timestamp: new Date().getTime()
    };
    let newMessages = this.state.messages;
    newMessages.push(newMessage);
    this.setState({
      messages: newMessages
    });
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
          return (<div className="messages-container"> it's empty. why not say something? </div>);
      }
      let messages = [];
      this.state.messages.forEach((element, i) => {
          messages.push(
          <Message
              key={i}
              author={element.author}
              message={element.message}
              timestamp={getTimeString(element.timestamp)}
          />
          );
      });
      return (
          <div className="messages-container">
              {messages}
          </div>
      );
  }
  render = () => {
      return (
          <div className="app-container">
              <header className="header-text">the hive</header>
              <p>find out what's all the buzz!</p>
              <hr />
              <div className="message-box">
                  <input 
                      className="text-input"
                      type="text"
                      value={this.state.author} 
                      onChange={this.handleAuthorChange}
                  />
                  <input 
                      className="text-input"
                      type="text"
                      value={this.state.message} 
                      onChange={this.handleMessageChange}
                  />
                  <button 
                    className="send-button" 
                    onClick={this.createMessage}
                  >
                      Send Message
                  </button>
              </div>
              {this.renderMessages()}
          </div>
      );
  }
}

export default App;
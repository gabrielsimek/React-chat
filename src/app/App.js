import { Component } from 'react';
import './App.css';

import { io } from 'socket.io-client';


export default class Chat extends Component {
  state = {
    chat: '',
    socket: {},
    message: ''
  }

  componentDidMount(){
    const socket = io('http://localhost:3000/', {
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    });
    this.setState({ socket: socket });
  
    socket.on('chat message', (message) => {
      this.handleMessage(message);
    });
  }
  handleSubmit = e => {
    const { socket } = this.state;
    e.preventDefault();
    const { chat } = this.state;
    
    socket.emit('chat message', chat);
    
  }

  handleMessage = (newMessage) => {

    this.setState({ message: newMessage });

  }
  handleChat = e => {
    this.setState({ chat: e.target.value });
  }

  render(){
    const { chat, message } = this.state;

   
    
    return (
     
      <div className="chat">
        <ul>
          <li id="messages"></li>
        </ul>
        <form onSubmit={this.handleSubmit}id="form" action="">
          <input value={chat} onChange={this.handleChat} id="input" /><button>Send</button>
        </form>
        <p>{message}</p>
      </div>
    );
  }

}
import io from 'socket.io-client';
import { newMessage } from '../features/messagesSlice';

class SocketIOClient {
  /**@type {SocketIOClient} */
  static _instance;

  /**
   * @param {import('@reduxjs/toolkit').EnhancedStore} store 
   */
  constructor(store) {
    this.socket = io.connect('http://localhost:5000', {
      autoConnect: false
    });
    this.isConnected = false;
    this.store = store;

    this.socket.on('unauthorized', reason => {
      console.log(reason);
      // dispatch(logInFail(reason.message))
    });

    this.socket.on('disconnect', () => {
      // dispatch(userLogOut())
      console.log('disconnected');
    })

    this.socket.on('message', message => {
      console.log(message);
      this.store.dispatch(newMessage(message));
    });
  }

  connect(authInfo) {
    this.socket.connect();
    if (authInfo) this.socket.emit('authentication', authInfo);
    //dispatch connected action
  }

  disconnect() {
    this.socket.disconnect();
    this.isConnected = false;
    //dispatch disconnected action
  }

  sendMessage(message) {
    if (this.isConnected) {
      this.socket.send(message);
      //dispatch message sent action
    }
  }

  getContact(username, cb) {
    this.socket.emit('contact', username, cb);
  }

  onAuthenticate(cb) {
    this.socket.on('authenticated', res => {
      this.isConnected = true;
      localStorage.setItem('token', res.token);
      cb(res);
      //set user state
      // this.store.dispatch(...);
    });
  }

  /**
   *
   * @param {import('@reduxjs/toolkit').EnhancedStore} store
   */
  static getInstance(store) {
    if (!SocketIOClient._instance) {
      SocketIOClient._instance = new SocketIOClient(store);
    }
    return SocketIOClient._instance;
  }
}

export default SocketIOClient;
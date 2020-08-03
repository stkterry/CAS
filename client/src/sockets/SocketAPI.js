import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://127.0.0.1:5002';

export default class SocketAPI {
  socket;
  room;

  connect(opts) {
    this.socket = socketIOClient(ENDPOINT);
    this.room = opts.room;
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        this.socket.emit('join', this.room);
        return resolve();
      })
      this.socket.on('connect_error', error => reject(error));
    })
  }

  disconnect() {
    return new Promise(resolve => {
      this.socket.disconnect(() => {
        this.socket = null;
        this.room = null;
        resolve();
      });
    });
  }

  emit(event, data, callback) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("No socket connection");
      return this.socket.emit(
        event, 
        { ...data, room: this.room}, 
        callback || (res => res.error ? reject(res.error) : resolve(res))
      )
    })
  }

  on(event, func) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection');

      this.socket.on(event, func);
      resolve();
    })
  }
}
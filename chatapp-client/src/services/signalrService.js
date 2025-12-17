import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection(username) {
    // ⚠️ Changed to HTTP (not HTTPS)
    this.connection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5082/chatHub?username=${username}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    try {
      await this.connection.start();
      console.log('✅ Connected to chat server');
      return true;
    } catch (err) {
      console.error('❌ Connection failed:', err);
      return false;
    }
  }

  onReceiveMessage(callback) {
    this.connection.on('ReceiveMessage', callback);
  }

  onUserConnected(callback) {
    this.connection.on('UserConnected', callback);
  }

  onUserDisconnected(callback) {
    this.connection.on('UserDisconnected', callback);
  }

  async sendMessage(user, message) {
    if (this.connection) {
      try {
        await this.connection.invoke('SendMessage', user, message);
        console.log('✅ Message sent');
      } catch (err) {
        console.error('❌ Send failed:', err);
      }
    }
  }

  async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
    }
  }
}

export default new SignalRService();

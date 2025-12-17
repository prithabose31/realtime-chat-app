import { useState, useEffect } from 'react';
import signalRService from './services/signalrService';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      signalRService.startConnection(user.username);

      signalRService.onReceiveMessage((username, message) => {
        setMessages(prev => [...prev, { 
          username, 
          message, 
          timestamp: new Date().toLocaleTimeString() 
        }]);
      });

      signalRService.onUserConnected((username) => {
        setOnlineUsers(prev => [...new Set([...prev, username])]);
        setMessages(prev => [...prev, {
          username: 'System',
          message: `${username} joined the chat`,
          timestamp: new Date().toLocaleTimeString(),
          isSystem: true
        }]);
      });

      signalRService.onUserDisconnected((username) => {
        setOnlineUsers(prev => prev.filter(u => u !== username));
        setMessages(prev => [...prev, {
          username: 'System',
          message: `${username} left the chat`,
          timestamp: new Date().toLocaleTimeString(),
          isSystem: true
        }]);
      });

      return () => {
        signalRService.stopConnection();
      };
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5082/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        const errorData = await response.text();
        setError(errorData || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5082/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        const errorData = await response.text();
        setError(errorData || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Connection error. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageInput.trim() && user) {
      await signalRService.sendMessage(user.username, messageInput);
      setMessageInput('');
    }
  };

  if (!user && currentView === 'login') {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>💬 Welcome Back</h1>
          <p>Login to continue chatting</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div className="switch-view">
            Don't have an account?{' '}
            <button 
              type="button"
              className="switch-link"
              onClick={() => { setCurrentView('register'); setError(''); }}
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user && currentView === 'register') {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>💬 Create Account</h1>
          <p>Join the conversation</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
              required
              autoFocus
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              required
            />
            <button type="submit">Register</button>
          </form>
          <div className="switch-view">
            Already have an account?{' '}
            <button 
              type="button"
              className="switch-link"
              onClick={() => { setCurrentView('login'); setError(''); }}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h3>🟢 Online ({onlineUsers.length})</h3>
        <div className="user-list">
          <div className="user-item current-user">
            {user.username} (You)
          </div>
          {onlineUsers.filter(u => u !== user.username).map((username, idx) => (
            <div key={idx} className="user-item">
              {username}
            </div>
          ))}
        </div>
        <button 
          className="logout-btn"
          onClick={() => {
            signalRService.stopConnection();
            setUser(null);
            localStorage.removeItem('user');
            setMessages([]);
            setOnlineUsers([]);
            setCurrentView('login');
          }}
        >
          Logout
        </button>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h2>Chat Room</h2>
          <span className="username-badge">{user.username}</span>
        </div>

        <div className="messages">
          {messages.length === 0 && (
            <div className="empty-state">
              No messages yet. Say hi! 👋
            </div>
          )}
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`message ${msg.isSystem ? 'system-message' : ''} ${msg.username === user.username ? 'own-message' : ''}`}
            >
              {!msg.isSystem && (
                <>
                  <div className="message-header">
                    <strong>{msg.username}</strong>
                    <span className="timestamp">{msg.timestamp}</span>
                  </div>
                  <div className="message-content">{msg.message}</div>
                </>
              )}
              {msg.isSystem && (
                <div className="system-content">{msg.message}</div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;

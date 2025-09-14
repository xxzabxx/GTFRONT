/**
 * Chat Service
 * Handles WebSocket communication for trading room chat
 */

import { io } from 'socket.io-client';

class ChatService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  /**
   * Connect to chat server
   * @param {string} token - JWT authentication token
   * @param {string} apiUrl - Backend API URL
   */
  connect(token, apiUrl) {
    if (this.socket) {
      this.disconnect();
    }

    try {
      // Create socket connection with authentication
      this.socket = io(apiUrl, {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true
      });

      // Setup event listeners
      this.setupEventListeners();

      console.log('🔌 Connecting to chat server...');
      return this.socket;

    } catch (error) {
      console.error('❌ Failed to connect to chat server:', error);
      throw error;
    }
  }

  /**
   * Disconnect from chat server
   */
  disconnect() {
    if (this.socket) {
      console.log('🔌 Disconnecting from chat server...');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  /**
   * Setup socket event listeners
   */
  setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('✅ Connected to chat server');
      this.isConnected = true;
      this.emit('connected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from chat server:', reason);
      this.isConnected = false;
      this.emit('disconnected', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Chat connection error:', error);
      this.emit('connection_error', error);
    });

    // Chat events
    this.socket.on('chat_history', (messages) => {
      console.log('📜 Received chat history:', messages.length, 'messages');
      this.emit('chat_history', messages);
    });

    this.socket.on('new_message', (message) => {
      console.log('💬 New message:', message);
      this.emit('new_message', message);
    });

    this.socket.on('user_joined', (data) => {
      console.log('👋 User joined:', data.username);
      this.emit('user_joined', data);
    });

    this.socket.on('user_left', (data) => {
      console.log('👋 User left:', data.username);
      this.emit('user_left', data);
    });

    this.socket.on('online_count', (data) => {
      console.log('👥 Online users:', data.count);
      this.emit('online_count', data.count);
    });

    this.socket.on('hot_stock_alert', (data) => {
      console.log('🔥 Hot stock alert:', data);
      this.emit('hot_stock_alert', data);
    });

    this.socket.on('error', (error) => {
      console.error('❌ Chat error:', error);
      this.emit('error', error);
    });
  }

  /**
   * Send a chat message
   * @param {string} message - Message text
   */
  sendMessage(message) {
    if (!this.socket || !this.isConnected) {
      throw new Error('Not connected to chat server');
    }

    if (!message || message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }

    if (message.length > 1000) {
      throw new Error('Message too long (max 1000 characters)');
    }

    console.log('📤 Sending message:', message);
    this.socket.emit('send_message', { message: message.trim() });
  }

  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {function} callback - Callback function
   */
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to listeners
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  /**
   * Get connection status
   * @returns {boolean} Connection status
   */
  getConnectionStatus() {
    return this.isConnected;
  }

  /**
   * Get socket instance
   * @returns {Socket} Socket instance
   */
  getSocket() {
    return this.socket;
  }
}

// Create singleton instance
const chatService = new ChatService();

export default chatService;


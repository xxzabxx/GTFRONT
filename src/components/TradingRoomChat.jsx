/**
 * Trading Room Chat Component
 * Real-time chat for premium users with stock symbol integration
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import chatService from '../services/chatService';
import { Send, Users, TrendingUp, AlertCircle, Wifi, WifiOff } from 'lucide-react';

const TradingRoomChat = ({ onStockSymbolClick }) => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotStockAlert, setHotStockAlert] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if user has premium access
  const hasPremiumAccess = user?.tier === 'pro' || user?.tier === 'premium';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Setup chat service listeners
  useEffect(() => {
    if (!hasPremiumAccess || !token) return;

    const handleConnected = () => {
      setIsConnected(true);
      setError(null);
      setIsLoading(false);
    };

    const handleDisconnected = (reason) => {
      setIsConnected(false);
      if (reason !== 'io client disconnect') {
        setError('Disconnected from chat server');
      }
    };

    const handleConnectionError = (error) => {
      setIsConnected(false);
      setIsLoading(false);
      setError('Failed to connect to chat server');
      console.error('Chat connection error:', error);
    };

    const handleChatHistory = (history) => {
      setMessages(history);
      setTimeout(scrollToBottom, 100);
    };

    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
      setTimeout(scrollToBottom, 100);
    };

    const handleUserJoined = (data) => {
      // Add system message for user joining
      const systemMessage = {
        id: `system-${Date.now()}`,
        username: 'System',
        message: `${data.username} joined the chat`,
        timestamp: data.timestamp,
        message_type: 'system'
      };
      setMessages(prev => [...prev, systemMessage]);
    };

    const handleUserLeft = (data) => {
      // Add system message for user leaving
      const systemMessage = {
        id: `system-${Date.now()}`,
        username: 'System',
        message: `${data.username} left the chat`,
        timestamp: data.timestamp,
        message_type: 'system'
      };
      setMessages(prev => [...prev, systemMessage]);
    };

    const handleOnlineCount = (count) => {
      setOnlineCount(count);
    };

    const handleHotStockAlert = (alert) => {
      setHotStockAlert(alert);
      // Auto-hide alert after 10 seconds
      setTimeout(() => setHotStockAlert(null), 10000);
    };

    const handleError = (error) => {
      setError(error.message || 'Chat error occurred');
    };

    // Add event listeners
    chatService.on('connected', handleConnected);
    chatService.on('disconnected', handleDisconnected);
    chatService.on('connection_error', handleConnectionError);
    chatService.on('chat_history', handleChatHistory);
    chatService.on('new_message', handleNewMessage);
    chatService.on('user_joined', handleUserJoined);
    chatService.on('user_left', handleUserLeft);
    chatService.on('online_count', handleOnlineCount);
    chatService.on('hot_stock_alert', handleHotStockAlert);
    chatService.on('error', handleError);

    // Connect to chat server
    setIsLoading(true);
    try {
      chatService.connect(token, import.meta.env.VITE_API_URL);
    } catch (error) {
      setError('Failed to initialize chat connection');
      setIsLoading(false);
    }

    // Cleanup on unmount
    return () => {
      chatService.off('connected', handleConnected);
      chatService.off('disconnected', handleDisconnected);
      chatService.off('connection_error', handleConnectionError);
      chatService.off('chat_history', handleChatHistory);
      chatService.off('new_message', handleNewMessage);
      chatService.off('user_joined', handleUserJoined);
      chatService.off('user_left', handleUserLeft);
      chatService.off('online_count', handleOnlineCount);
      chatService.off('hot_stock_alert', handleHotStockAlert);
      chatService.off('error', handleError);
      chatService.disconnect();
    };
  }, [hasPremiumAccess, token]);

  // Handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !isConnected) return;

    try {
      chatService.sendMessage(newMessage);
      setNewMessage('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle stock symbol clicks
  const handleStockClick = (symbol) => {
    console.log('💬 Stock symbol clicked in chat:', symbol)
    
    // Dispatch event to update chart
    window.dispatchEvent(new CustomEvent('updateChart', {
      detail: { symbol }
    }))
    
    // Also call the prop callback if provided
    if (onStockSymbolClick) {
      onStockSymbolClick(symbol)
    }
  }

  // Render message with stock symbol links
  const renderMessage = (message) => {
    const stockPattern = /\$([A-Z]{1,5})\b/g;
    const parts = message.split(stockPattern);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a stock symbol
        return (
          <span
            key={index}
            className="text-blue-600 hover:text-blue-800 cursor-pointer font-semibold"
            onClick={() => handleStockClick(part)}
          >
            ${part}
          </span>
        );
      }
      return part;
    });
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // If user doesn't have premium access
  if (!hasPremiumAccess) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-96 flex flex-col items-center justify-center">
        <TrendingUp className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
        <p className="text-gray-600 text-center mb-4">
          Trading Room Chat is available for Pro and Premium subscribers only.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Upgrade to Pro
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-96 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Trading Room</h3>
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{onlineCount} online</span>
        </div>
      </div>

      {/* Hot Stock Alert */}
      {hotStockAlert && (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-3 m-2 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-orange-800">
              Hot Stock Alert: ${hotStockAlert.symbol} +{hotStockAlert.change_percent}%
            </span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-3 m-2 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.message_type === 'system' ? 'items-center' : 'items-start'
              }`}
            >
              {message.message_type === 'system' ? (
                <div className="text-xs text-gray-500 italic">
                  {message.message}
                </div>
              ) : (
                <div className="max-w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {message.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-800 break-words">
                    {renderMessage(message.message)}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            disabled={!isConnected || isLoading}
            maxLength={1000}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!isConnected || !newMessage.trim() || isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="text-xs text-gray-500 mt-1">
          {newMessage.length}/1000 characters
        </div>
      </div>
    </div>
  );
};

export default TradingRoomChat;


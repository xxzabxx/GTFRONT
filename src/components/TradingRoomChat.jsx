import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import chatService from '../services/chatService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Users, Wifi, WifiOff, TrendingUp, AlertCircle } from 'lucide-react';

const TradingRoomChat = ({ onStockSymbolClick, className = '' }) => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hotStockAlert, setHotStockAlert] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if user has premium access
  const hasPremiumAccess = user?.subscription_tier === 'pro' || user?.subscription_tier === 'premium';

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

    const handleDisconnected = () => {
      setIsConnected(false);
      setIsLoading(false);
    };

    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    };

    const handleChatHistory = (history) => {
      setMessages(history);
      setIsLoading(false);
      scrollToBottom();
    };

    const handleUserJoined = (data) => {
      console.log('User joined:', data.username);
    };

    const handleUserLeft = (data) => {
      console.log('User left:', data.username);
    };

    const handleOnlineCount = (count) => {
      setOnlineCount(count);
    };

    const handleHotStockAlert = (alert) => {
      setHotStockAlert(alert);
      setTimeout(() => setHotStockAlert(null), 10000); // Hide after 10 seconds
    };

    const handleError = (error) => {
      console.error('Chat error:', error);
      setError(error.message || 'Connection error');
      setIsConnected(false);
      setIsLoading(false);
    };

    // Register event listeners
    chatService.on('connected', handleConnected);
    chatService.on('disconnected', handleDisconnected);
    chatService.on('new_message', handleNewMessage);
    chatService.on('chat_history', handleChatHistory);
    chatService.on('user_joined', handleUserJoined);
    chatService.on('user_left', handleUserLeft);
    chatService.on('online_count', handleOnlineCount);
    chatService.on('hot_stock_alert', handleHotStockAlert);
    chatService.on('error', handleError);

    // Connect to chat
    chatService.connect(token, import.meta.env.VITE_API_URL);

    return () => {
      // Cleanup listeners
      chatService.off('connected', handleConnected);
      chatService.off('disconnected', handleDisconnected);
      chatService.off('new_message', handleNewMessage);
      chatService.off('chat_history', handleChatHistory);
      chatService.off('user_joined', handleUserJoined);
      chatService.off('user_left', handleUserLeft);
      chatService.off('online_count', handleOnlineCount);
      chatService.off('hot_stock_alert', handleHotStockAlert);
      chatService.off('error', handleError);
      
      chatService.disconnect();
    };
  }, [hasPremiumAccess, token]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return;

    try {
      await chatService.sendMessage(newMessage.trim());
      setNewMessage('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Failed to send message:', error);
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
    const text = message.message || message.text;
    if (!text) return '';

    // Regex to find stock symbols ($SYMBOL)
    const stockSymbolRegex = /\$([A-Z]{1,5})/g;
    const parts = text.split(stockSymbolRegex);
    
    return parts.map((part, index) => {
      // If this part matches a stock symbol pattern
      if (index % 2 === 1 && /^[A-Z]{1,5}$/.test(part)) {
        return (
          <button
            key={index}
            onClick={() => handleStockClick(part)}
            className="text-primary hover:text-primary/80 font-semibold underline cursor-pointer"
          >
            ${part}
          </button>
        );
      }
      return part;
    });
  };

  // Premium access screen
  if (!hasPremiumAccess) {
    return (
      <Card className={`bg-background border-border ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Trading Room Chat</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Premium Feature</h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Trading Room Chat is available for Pro and Premium subscribers only.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Main chat interface
  return (
    <Card className={`bg-background border-border ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Trading Room</CardTitle>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Users className="h-3 w-3 mr-1" />
                {onlineCount}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Hot Stock Alert */}
        {hotStockAlert && (
          <div className="mx-4 mb-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Hot Stock Alert</span>
            </div>
            <p className="text-sm text-foreground mt-1">
              {hotStockAlert.symbol} is up {hotStockAlert.change}% with high volume!
            </p>
          </div>
        )}

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto px-4 space-y-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {message.username}
                  </span>
                  {message.tier === 'premium' && (
                    <Badge variant="default" className="text-xs bg-primary text-primary-foreground">
                      Premium
                    </Badge>
                  )}
                  {message.tier === 'pro' && (
                    <Badge variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                      Pro
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm text-foreground">
                  {renderMessage(message)}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isConnected ? "Type your message..." : "Connecting..."}
              disabled={!isConnected || isLoading}
              maxLength={1000}
              className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!isConnected || !newMessage.trim() || isLoading}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              {newMessage.length}/1000
            </span>
            {!isConnected && (
              <span className="text-xs text-destructive">
                Failed to connect to chat server
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingRoomChat;


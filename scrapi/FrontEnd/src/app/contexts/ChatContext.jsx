import { createContext, useContext, Context } from 'react';
import { SocketService } from '../services/SocketService';

export const ChatContext = createContext(new SocketService());

export const useChat = () => useContext(ChatContext);

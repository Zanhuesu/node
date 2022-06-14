import '../fake-db'
import React, { useState } from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { SocketService } from './services/SocketService';
import { USER_INITIAL_VALUE } from './constants';
import { UserContext } from './contexts/UserContext';
import { ChatContext } from './contexts/ChatContext';

const chat = new SocketService();

const App = () => {
    const all_pages = useRoutes(AllPages())
    const userJSON = localStorage.getItem('chat-app-user');
    const [ userDetails, setUserDetails ] = useState(userJSON !== null ? JSON.parse(userJSON) : USER_INITIAL_VALUE);
    
    return (
        <Provider store={Store}>
            <SettingsProvider>
                <MatxTheme>
                    <AuthProvider>
                        <UserContext.Provider value={{ userDetails, setUserDetails }}>
                            <ChatContext.Provider value={chat}>
                                {all_pages}
                            </ChatContext.Provider>
			            </UserContext.Provider>
                    </AuthProvider>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App

import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

declare global {
    interface Window {
        getWebChatCraftTalkExternalControl: any;
    }
}

function App() {
    
    function loadScript(url?: string, content?: string, defer = true) {
        const script = document.createElement('script');
        script.innerHTML = content ?? '';
        script.src = url ?? '';
        script.async = false;
        script.defer = defer;
        document.body.appendChild(script);
    }
    
    const addChatHandler = () => {
        loadScript('https://chat-marketplace.beta.moex.com/get-bootstrap/channel_395750d');
        //loadScript('https://chat-marketplace.beta.moex.com/get-bootstrap/channel_377e8bf');
        window.getWebChatCraftTalkExternalControl = (externalControl: any) => {
            console.log(externalControl);
            
            externalControl.on('webchatOpened', () => {
                console.log('webchatOpened event')
            })
            externalControl.closeWidget();
        }
    }
    
    const removeChatHandler = () => {
        
        const arr = document.querySelectorAll('[class^="webchat"]')
        
        console.log(arr.length)
        
        for (let i = 0; i < arr.length; i++) {
            arr[i].remove()
        }
        
    }
    
    return (
        <div className="App">
            <button onClick={addChatHandler}>Add chat</button>
            <button onClick={removeChatHandler}>Remove chat</button>
        </div>
    );
}

export default App;

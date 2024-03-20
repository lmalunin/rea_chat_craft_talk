import React, { useEffect } from 'react';
import { sha256 } from 'js-sha256';
import base64Js from 'base64-js';
import './App.css';

declare global {
    interface Window {
        getWebChatCraftTalkExternalControl: any;
        __WebchatUserCallback: any;
    }
}

function App() {
    
    const sha256hash = (message: string) => {
        const hashBytes = new Uint8Array(sha256.arrayBuffer(message));
        const encodedHash = base64Js.fromByteArray(hashBytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/\/=/g, '');
        
        return encodedHash;
    };
    
    const getChatHash = () => {
        return '';
    }
    
    useEffect(() => {
        window.__WebchatUserCallback = function () {
            console.log('__WebchatUserCallback')
            const data = {
                uuid: '4a623193-53d1-402e-9459-81f7798a5331',
                first_name: 'Петр',
                last_name: 'Петров',
                hash: 'ba380f92a6d69d2fff2743777cb9daf6fba53ed42974fd5a8ebde878980be996'
            };
            return data;
        }
        
        
        return () => {
            window.__WebchatUserCallback = null;
        }
    }, [])
    
    function loadScript(url?: string, content?: string, defer = true) {
        const script = document.createElement('script');
        script.innerHTML = content ?? '';
        script.src = url ?? '';
        script.async = false;
        script.defer = defer;
        document.body.appendChild(script);
    }
    
    const addChatHandler = () => {
        
        // window.__WebchatUserCallback = function () {
        //     console.log('__WebchatUserCallback')
        //     const data = {
        //         uuid: '4a623193-53d1-402e-9459-81f7798a5331',
        //         first_name: 'Петр',
        //         last_name: 'Петров',
        //         hash: 'ba380f92a6d69d2fff2743777cb9daf6fba53ed42974fd5a8ebde878980be996'
        //     };
        //     return data;
        // }
        
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
        
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                arr[i].remove()
            }
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

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  const widgetChatElName = 'widget-chat'
  let widget: any = null;
  
  function loadScript(url?: string, content?: string, defer = true) {
    const script = document.createElement('script');
    script.innerHTML = content ?? '';
    script.src = url ?? '';
    script.async = false;
    script.defer = defer;
    document.body.appendChild(script);
  }
  
  function createWidget() {
    widget = document.querySelector(widgetChatElName);
    
    if (!widget) {
      widget = document.createElement(widgetChatElName);
      //widget.options = content;
      document.body.appendChild(widget);
    }
  }
  
  const addChatHandler = () => {
    loadScript('https://cloud.craft-talk.com/get-bootstrap/webchat_test')
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

import dedent from "ts-dedent";
import type { Preferences } from "../utils";

export function getReactMain(preferences: Preferences) {
  return dedent`
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './App.css';

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  `;
}

export function getReactApp(preferences: Preferences) {
  const { meta } = preferences;

  return dedent`
 import { useEffect, useState } from 'react';
import { Button, TextField } from '@vscode/webview-ui-toolkit';
import { vscode } from './utils/vscode';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleHello = () => {
    vscode.postMessage({ type: 'hello', data: message });
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      setResponse(message.text || '');
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="container">
      <h1>HelloWorld</h1>
      <div className="field">
        <TextField value={message} onChange={(e) => setMessage((e.target as any).value)}>
          Enter message
        </TextField>
      </div>
      <div className="buttons">
        <Button onClick={handleHello}>Send Hello</Button>
      </div>
      {response && <div className="response">{response}</div>}
    </div>
  );
}

export default App;
  `;
}

import {
  VSCodeButton,
  VSCodeTextField,
} from "@vscode/webview-ui-toolkit/react";
import { useCallback, useState } from "react";
import { vscode } from "./utils/vscode";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [state, setState] = useState("");

  const onSetState = useCallback(() => {
    vscode.setState(state);
  }, [state]);
  const onGetState = useCallback(() => {
    setState((vscode.getState() || "") as string);
  }, []);

  const onPostMessage = useCallback(() => {
    vscode.postMessage({
      data: `💬: ${message || "Empty"}`,
      type: "hello",
    });
  }, [message]);

  const onMessageInput = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement | null;
    setMessage(target?.value ?? "");
  }, []);
  const onStateInput = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement | null;
    setState(target?.value ?? "");
  }, []);

  return (
    <main>
      <h1>Hello React!</h1>
      <VSCodeButton onClick={onPostMessage}>Test VSCode Message</VSCodeButton>
      <div>
        <VSCodeTextField onInput={onMessageInput} value={message}>
          Please enter a message
        </VSCodeTextField>
        <div>
          Message is:
          {message}
        </div>
      </div>
      <div>
        <VSCodeTextField onInput={onStateInput} value={state}>
          Please enter a state
        </VSCodeTextField>
        <div>
          State is:
          {state}
        </div>
        <div>
          <VSCodeButton onClick={onSetState}>setState</VSCodeButton>
          <VSCodeButton onClick={onGetState} style={{ marginLeft: "8px" }}>
            getState
          </VSCodeButton>
        </div>
      </div>
    </main>
  );
}

export default App;

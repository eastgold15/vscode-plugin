import dedent from "ts-dedent";
import type { Preferences } from "../utils";

export function getVueMain(preferences: Preferences) {
  return dedent`
    import { createApp } from 'vue';
    import App from './App.vue';
    import './style.css';

    createApp(App).mount('#root');
  `;
}

export function getVueApp(preferences: Preferences) {
  const { meta } = preferences;

  return dedent`
    <script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';
    import { Button, TextField } from '@vscode/webview-ui-toolkit';

    const message = ref('');
    const response = ref('');

    const handleHello = () => {
      const vscode = (window as any).acquireVsCodeApi();
      vscode.postMessage({ type: 'hello', data: message.value });
    };

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data;
      response.value = msg.text || '';
    };

    onMounted(() => {
      window.addEventListener('message', handleMessage);
    });

    onUnmounted(() => {
      window.removeEventListener('message', handleMessage);
    });
    </script>

    <template>
      <div class="container">
        <h1>${meta.viewName}</h1>
        <div class="field">
          <vscode-text-field v-model="message" label="Enter message"></vscode-text-field>
        </div>
        <div class="buttons">
          <vscode-button @click="handleHello">Send Hello</vscode-button>
        </div>
        <div v-if="response" class="response">{{ response }}</div>
      </div>
    </template>

    <style scoped>
    .container {
      padding: 16px;
    }

    .field {
      margin: 16px 0;
    }

    .buttons {
      margin: 16px 0;
    }

    .response {
      margin-top: 16px;
      padding: 8px;
      background-color: var(--vscode-editor-selectionBackground);
      border-radius: 4px;
    }
    </style>
  `;
}

export function getVueShims() {
  return `declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
`;
}

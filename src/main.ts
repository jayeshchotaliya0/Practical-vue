import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import '../src/index.css' // your TailwindCSS
import './assets/main.css';

const app = createApp(App)

app.use(createPinia()) // important to install pinia globally

app.mount('#app')

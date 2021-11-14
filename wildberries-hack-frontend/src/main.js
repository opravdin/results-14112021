import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


/**
 * Подключение API
 */
 import initApi from "./lib/api"
 const apiClient = initApi("https://example.com")

createApp({...App, provide: {$api: apiClient}}).mount('#app')


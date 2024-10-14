import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your router configuration
import store from './store/index'; // Import Vuex store

const app = createApp(App);

app.use(store); // Use Vuex store
app.use(router);
app.mount('#app');

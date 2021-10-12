import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { createI18n } from 'vue-i18n'
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);


const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es: require('~/locales/es.json'),
  }
})



const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(i18n)




const files = require.context('./components/', true, /\.vue$/i);
// @ts-ignore
files.keys().map(key => app.component(key.split('/').pop().split('.')[0], files(key).default));

import * as IonComponents from '@ionic/vue';

Object.keys(IonComponents).forEach(key => {
  if (/^Ion[A-Z]\w+$/.test(key)) {
    // @ts-ignore
    app.component(key, IonComponents[key]);
  }
});
  
router.isReady().then(() => {
  app.mount('#app');
});
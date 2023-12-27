import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faStar, faCopy, faCog, faEyeSlash, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import i18n from '@/plugins/translations/i18n';

import router from '@/router'
import store from '@/store'

library.add(faEye, faStar, faCopy, faCog, faEyeSlash, faUndo)



createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')

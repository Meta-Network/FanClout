import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import moment from 'moment'
import installElementPlus from './plugins/element'

moment.locale('en-US')

const app = createApp(App)

installElementPlus(app)

moment.locale('en-US')
app.config.globalProperties.$moment = moment

app.use(i18n).use(i18n).use(store).use(router).mount('#app')

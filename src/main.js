import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import moment from 'moment'
import installElementPlus from './plugins/element'
import initSvgIcon from '@/icons'
import './fonts/fonts.css'

moment.locale('en-US')

const app = createApp(App)

installElementPlus(app)

initSvgIcon(app)

moment.locale('en-US')
app.config.globalProperties.$moment = moment

app.use(i18n).use(store).use(router).mount('#app')

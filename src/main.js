import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import moment from 'moment'
import installElementPlus from './plugins/element'
import initSvgIcon from '@/icons'
import utils from '@/utils/utils'
import API from '@/api/API'
import ossProcess from '@/utils/oss_process'
import avatar from '@/common/components/avatar'
import userPopover from '@/common/components/user_popover'
import './fonts/fonts.css'

moment.locale('en-US')

const app = createApp(App)

installElementPlus(app)

initSvgIcon(app)

moment.locale('en-US')
app.config.globalProperties.$moment = moment

app.config.globalProperties.$utils = utils

app.config.globalProperties.$ossProcess = ossProcess

app.config.globalProperties.$API = API

// eslint-disable-next-line vue/component-definition-name-casing
app.component('c-avatar', avatar)
// eslint-disable-next-line vue/component-definition-name-casing
app.component('c-user-popover', userPopover)

app.use(i18n).use(store).use(router).mount('#app')

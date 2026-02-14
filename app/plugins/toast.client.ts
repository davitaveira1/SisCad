import { defineNuxtPlugin } from '#app'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 4000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    showCloseButtonOnHover: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, options)
})

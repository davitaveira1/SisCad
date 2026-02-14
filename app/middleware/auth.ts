import { useAuth } from '~/composables/useAuth'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async () => {
    const { checkAuth } = useAuth()
    const isLoggedIn = await checkAuth()

    if (!isLoggedIn) {
        return navigateTo('/Login')
    }
})

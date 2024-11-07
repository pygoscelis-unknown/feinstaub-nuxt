import { consola } from 'consola'

export default defineEventHandler((event) => {
    consola.info('Incoming: ' + getRequestURL(event))
})

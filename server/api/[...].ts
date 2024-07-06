import type { H3Event } from 'h3'
import { createRouter, defineEventHandler } from 'h3'

const config = useRuntimeConfig()
const router = createRouter()

router.post('/:sensorType', defineEventHandler(async (event: H3Event) => {
  const params = getRouterParams(event)
  const url = `${config.public.baseURL}/${params.sensorType}/?format=json`
  return await $fetch(url)
}))

export default useBase('/api', router.handler)

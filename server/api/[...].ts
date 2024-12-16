import type { H3Event } from 'h3'
import { createRouter, defineEventHandler } from 'h3'
import { consola } from 'consola'

const router = createRouter()

router.post('/:sensorType', defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const params = getRouterParams(event)
  const query = getQuery(event)
  const queryWithLimit = { ...query, limit: 100 }
  const url = `${config.public.apiBaseUrl}/${params.sensorType}.json`
  consola.info(`Outgoing: ${url}`)
  consola.info(`Query: ${JSON.stringify(queryWithLimit)}`)
  return await $fetch(url, { method: 'GET', query: queryWithLimit })
}))

export default useBase('/api', router.handler)

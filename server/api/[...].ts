import type { H3Event } from 'h3'
import { createRouter, defineEventHandler } from 'h3'
import { consola } from 'consola'

const router = createRouter()

router.get('/sensors', defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const url = `${config.public.apiBaseUrl}`
  consola.info(`Fetching sensor types from: ${url}`)
  const response = await $fetch(url)
  // Convert the response object keys into an array of sensor types
  return Object.keys(response).map(key => ({ value: key, label: key.toUpperCase() }))
}))

router.post('/:sensorType', defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const params = getRouterParams(event)
  const query = getQuery(event)
  const offset = Number(query.offset || 0)
  const queryWithLimit = { ...query, limit: 100, offset }
  const url = `${config.public.apiBaseUrl}/${params.sensorType}.json`
  consola.info(`Outgoing: ${url}`)
  consola.info(`Query: ${JSON.stringify(queryWithLimit)}`)
  return await $fetch(url, { method: 'GET', query: queryWithLimit })
}))

export default useBase('/api', router.handler)

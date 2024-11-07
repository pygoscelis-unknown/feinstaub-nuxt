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
  consola.info('Outgoing: ' + url)
  console.log('Query: ' + JSON.stringify(queryWithLimit))
  const response = await $fetch(url, { method: 'GET', query: queryWithLimit })
  // const response = await $fetch('https://jsonplaceholder.typicode.com/todos')
  console.info('Response: ' + response)
  return response
}))

export default useBase('/api', router.handler)

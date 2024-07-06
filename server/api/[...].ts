import type { H3Event } from 'h3'
import { createRouter, defineEventHandler } from 'h3'

import { february, january } from '~/mockData'

const router = createRouter()

router.post('/:sensorType', defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const params = getRouterParams(event)
  const query = getQuery(event)
  console.log(query)
  const url = `${config.public.apiBaseUrl}/${params.sensorType}.json`

  switch (query.month) {
    case 'January':
      return january
    case 'February':
      return february
  }
  return await $fetch(url)
}))

export default useBase('/api', router.handler)

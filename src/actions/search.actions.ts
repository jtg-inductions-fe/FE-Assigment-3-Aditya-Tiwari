'use server'

import { fetchData } from '@/utils/fetchData'

const fetchUsers = async (query: string) => {
  const response = await fetchData({
    resource: `/search/users?q=${encodeURIComponent(query)}+in:login`,
  })

  return response.responseData
}

export { fetchUsers }

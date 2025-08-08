'use server'

import { GithubSearchResponse } from '@/types/githubResponse'
import { fetchData } from '@/utils/fetchData'

const fetchUsers = async (query: string) => {
  const response = await fetchData<GithubSearchResponse>({
    resource: `/search/users?q=${encodeURIComponent(query)}+in:login`,
  })

  return response.responseData
}

export { fetchUsers }

import { GithubRepository } from "@/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Parameters for the repository search query
type SearchRepositoriesParams = {
  // Search query
  query: string
  // Number of results per page
  perPage?: number
  // The page number to fetch
  page?: number
  // Field to sort by (stars, forks, updated)
  sort?: string
  // Sort order (asc, desc)
  order?: string
}

// Create api service using RTK Query
export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // Query for searching GitHub repositories
    searchRepositories: builder.query<
      { items: GithubRepository[]; totalCount: number },
      SearchRepositoriesParams
    >({
      query: ({ query, perPage, page, sort, order }) => ({
        url: `/search/repositories`,
        params: {
          q: query,
          per_page: perPage,
          page,
          sort,
          order,
        },
      }),
      // Transform response to match the GithubRepository type
      transformResponse: (response: any) => ({
        items: response.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          forks: item.forks_count,
          stars: item.stargazers_count,
          updated: item.updated_at,
          language: item.language,
          license: item.license?.name,
          topics: item.topics,
        })),
        totalCount: response.total_count,
      }),
    }),
  }),
})

export const { useSearchRepositoriesQuery } = githubApi

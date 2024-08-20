import { NextApiRequest, NextApiResponse } from "next"

// Proxy to github api with optional authorization
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url ?? "")

  const [query, perPage, page, sort, order] = [
    searchParams.get("q") ?? "",
    searchParams.get("per_page") ?? "30",
    searchParams.get("page") ?? "0",
    searchParams.get("sort") ?? "stars", // stars, forks, updated
    searchParams.get("order") ?? "desc", // desc, asc
  ]
  const params = new URLSearchParams({
    q: query,
    sort,
    order,
    per_page: perPage,
    page,
  })
  const ghToken = process.env.GITHUB_TOKEN
  const response = await fetch(
    "https://api.github.com/search/repositories?" + params,
    {
      headers: {
        // Optionally add authorization header if github token is in env variable
        ...(ghToken && { Authorization: `bearer ${ghToken}` }),
        "Content-Type": "application/json",
      },
    },
  )
  const data = await response.json()

  if (!response.ok) return Response.json(data, { status: response.status })

  return Response.json(data)
}

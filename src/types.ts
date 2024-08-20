// Type for github repository
export type GithubRepository = {
  // Unique identifier
  id: string
  // Name
  name: string
  // Description
  description: string
  // Number of forks
  forks: number
  // Number of stars
  stars: number
  // Last updated date (ISO)
  updated: string
  // Primary programming language
  language?: string
  // License name
  license?: string
  // Array of topics/tags associated with repository
  topics: string[]
}

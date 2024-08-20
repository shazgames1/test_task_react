// Main pages with layout
"use client"

import { FormEvent, useState } from "react"
import {
  AppBar,
  Box,
  Button,
  Grid,
  InputBase,
  Stack,
  Typography,
} from "@mui/material"
import { GithubRepository } from "@/types"
import { RepositoryList } from "@/components/repository-list"
import { RepositoryInfo } from "@/components/repository-info"
import styles from "./page.module.scss"

export default function Home() {
  const [query, setQuery] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRepository, setSelectedRepository] =
    useState<GithubRepository>()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchQuery(query.trim())
  }

  return (
    <Box className={styles.container}>
      <AppBar
        className={styles.appBar}
        position="relative"
        color="secondary"
        variant="outlined"
      >
        <form onSubmit={onSubmit}>
          <Grid container spacing={1} alignItems="center">
            <Grid item sm={8}>
              <InputBase
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поисковый запрос"
                name="query"
                className={styles.searchInput}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className={styles.searchButton}
                type="submit"
              >
                Искать
              </Button>
            </Grid>
          </Grid>
        </form>
      </AppBar>
      <Grid container className={styles.contentContainer}>
        <Grid
          item
          xs={selectedRepository || searchQuery ? 8 : 12}
          className={styles.leftColumn}
        >
          {searchQuery ? (
            // Show page with results
            <Box className={styles.searchResultsContainer}>
              <Typography variant="h4">Результаты поиска</Typography>
              <RepositoryList
                searchQuery={searchQuery}
                onSelectRepository={setSelectedRepository}
              />
            </Box>
          ) : (
            // No search query, show empty page with greeting
            <Stack className={styles.welcomeMessage}>
              <Typography variant="h4">Добро пожаловать</Typography>
            </Stack>
          )}
        </Grid>
        {/* Side panel with selected repository info */}
        <Grid item xs={4} className={styles.rightColumn}>
          {selectedRepository ? (
            <RepositoryInfo repository={selectedRepository} />
          ) : (
            <Stack className={styles.selectRepositoryMessage}>
              <Typography>Выберите репозитарий</Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

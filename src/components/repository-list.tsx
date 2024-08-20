// MUI table wrapper to render github repositories
"use client"

import { useState } from "react"
import { Box, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { GithubRepository } from "@/types"
import { useSearchRepositoriesQuery } from "@/lib/services/github"
import { clamp, formatNumber } from "@/lib/utils"
import styles from "./repository-list.module.scss"

const columns: GridColDef<GithubRepository>[] = [
  {
    field: "name",
    headerName: "Название",
    flex: 1,
    sortable: false,
    maxWidth: 320,
  },
  {
    field: "language",
    headerName: "Язык",
    sortable: false,
  },
  {
    field: "forks",
    headerName: "Число форков",
    flex: 1,
    maxWidth: 180,
    sortingOrder: ["asc", "desc"],
    valueFormatter: (v: number) => formatNumber(v),
  },
  {
    field: "stars",
    headerName: "Число звезд",
    flex: 1,
    maxWidth: 180,
    sortingOrder: ["asc", "desc"],
    valueFormatter: (v: number) => formatNumber(v),
  },
  {
    field: "updated",
    headerName: "Дата обновления",
    maxWidth: 220,
    flex: 1,
    sortingOrder: ["asc", "desc"],
    valueFormatter: (v: string) => new Date(v).toLocaleString("ru-RU"),
  },
]

interface RepositoryListProps {
  searchQuery: string
  onSelectRepository: (repository: GithubRepository) => void
}

export function RepositoryList({
  searchQuery,
  onSelectRepository,
}: RepositoryListProps) {
  const [orderBy, setOrderBy] = useState<string>()
  const [order, setOrder] = useState<string>()
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(25)

  const { data, error, isFetching } = useSearchRepositoriesQuery({
    query: searchQuery,
    sort: orderBy,
    order: order,
    page: page + 1,
    perPage,
  })

  if (error) return <Typography>Ошибка: {JSON.stringify(error)}</Typography>

  return (
    <Box className={styles.container}>
      <DataGrid
        className={styles.dataGrid}
        // Use style because mui overwrites styles from classNames
        style={{ border: "none" }}
        rows={data?.items ?? []}
        columns={columns}
        disableColumnFilter
        disableRowSelectionOnClick
        rowCount={
          // Limit search result to 1000 due github's limit
          clamp(data?.totalCount ?? 0, 0, 1000)
        }
        sortingMode="server"
        paginationMode="server"
        paginationModel={{ page, pageSize: perPage }}
        onSortModelChange={(m) => {
          const sortModel = m[0]
          setOrderBy(sortModel?.field)
          setOrder(sortModel?.sort ?? undefined)
          setPage(0)
        }}
        onPaginationModelChange={(m) => {
          setPage(m.page)
          setPerPage(m.pageSize)
        }}
        onRowClick={(params) => {
          const selectedRepository = data?.items.find((v) => v.id === params.id)
          if (selectedRepository) {
            onSelectRepository(selectedRepository)
          }
        }}
        loading={isFetching}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
    </Box>
  )
}

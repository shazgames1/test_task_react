// Side panel with selected repository info
import { Stack, Typography, Chip } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { GithubRepository } from "@/types"
import styles from "./repository-info.module.scss"
import { formatNumber } from "@/lib/utils"

interface Props {
  repository: GithubRepository
}

export function RepositoryInfo({ repository }: Props) {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">{repository.name}</Typography>
      <Typography>{repository.description}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {repository.language && (
          <Chip label={repository.language} color="primary" />
        )}
        <Stack direction="row" alignItems="center">
          <StarIcon className={styles.starIcon} />
          <Typography>{formatNumber(repository.stars)}</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {repository.topics.map((topic, index) => (
          <Chip label={topic} key={index} />
        ))}
      </Stack>
      <Typography>{repository.license}</Typography>
    </Stack>
  )
}

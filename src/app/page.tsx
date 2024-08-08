import { Switch } from "@mui/material";
import styles from "./page.module.scss";
import PokemonFetcher from "@/components/pokemon-fetcher";

export default function Home() {
  return (
    <div className={styles.main}>
      <PokemonFetcher />
      <p>Github token {process.env.GITHUB_TOKEN}</p>
      <Switch />
    </div>
  );
}

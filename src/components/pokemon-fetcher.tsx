"use client"
import { useGetPokemonByNameQuery } from "@/lib/services/pokemon";

export default function PokemonFetcher() {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

  if (isLoading) return <p>Loading</p>

  if (error) return <p>Error</p>

  return (
    <p>{data?.name} ({data?.id})</p>
  )
}
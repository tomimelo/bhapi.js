export interface BrawlhallaAPIConfig {
  apiKey: string
}

export type SteamId64 = string

export interface Player {
  brawlhalla_id: number
  name: string
}

export type Bracket = '1v1' | '2v2'
export type Region = 'us-e' | 'us-w' | 'eu' | 'sea' | 'brz' | 'aus' | 'all'

export interface RankingsOptions {
  bracket: Bracket
  region: Region
  page: number
  name?: string
}

export interface Ranking {
  rank: string
  name: string
  brawlhalla_id: number
  best_legend: number
  best_legend_games: number
  best_legend_wins: number
  rating: number
  tier: string
  games: number
  wins: number
  region: string
  peak_rating: number
}

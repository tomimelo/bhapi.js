export interface BrawlhallaAPIConfig {
  apiKey: string
}

export type SteamId64 = string

export type Bracket = '1v1' | '2v2'
export type Region = 'us-e' | 'us-w' | 'eu' | 'sea' | 'brz' | 'aus' | 'all'

export interface Player {
  brawlhalla_id: number
  name: string
}

interface PlayerClanInfo {
  clan_name: string
  clan_id: number
  clan_xp: string
  personal_xp: number
}

export interface LegendStats {
  legend_id: number
  legend_name_key: string
  damagedealt: string
  damagetaken: string
  kos: number
  falls: number
  suicides: number
  teamkos: number
  matchtime: number
  games: number
  wins: number
  damageunarmed: string
  damagethrownitem: string
  damageweaponone: string
  damageweapontwo: string
  damagegadgets: string
  kounarmed: number
  kothrownitem: number
  koweaponone: number
  koweapontwo: number
  kogadgets: number
  timeheldweaponone: number
  timeheldweapontwo: number
  xp: number
  level: number
  xp_percentage: number
}
export interface PlayerStats extends Player {
  xp: number
  level: number
  xp_percentage: number
  games: number
  wins: number
  damagebomb: string
  damagemine: string
  damagespikeball: string
  damagesidekick: string
  hitsnowball: number
  kobomb: number
  komine: number
  kospikeball: number
  kosidekick: number
  kosnowball: number
  legends: ReadonlyArray<LegendStats>
  clan: PlayerClanInfo
}

export interface LegendData {
  legend_id: number
  legend_name_key: string
  bio_name: string
  bio_aka: string
  weapon_one: string
  weapon_two: string
  strength: string
  dexterity: string
  defense: string
  speed: string
}

export interface Legend extends LegendData {
  bio_quote: string
  bio_quote_about_attrib: string
  bio_quote_from: string
  bio_quote_from_attrib: string
  bio_text: string
  bot_name: string
}

interface LegendRankedData {
  legend_id: 4
  legend_name_key: string
  rating: number
  peak_rating: number
  tier: string
  wins: number
  games: number
}

export interface RankedTeam {
  brawlhalla_id_one: number
  brawlhalla_id_two: number
  rating: number
  peak_rating: number
  tier: string
  wins: number
  games: number
  teamname: string
  region: number
  global_rank: number
}

export interface PlayerRankedData extends Player {
  rating: number
  peak_rating: number
  tier: string
  wins: number
  games: number
  region: string
  global_rank: number
  region_rank: number
  legends: ReadonlyArray<LegendRankedData>
  '2v2': ReadonlyArray<RankedTeam>
}

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

export interface ClanMember {
  brawlhalla_id: number
  name: string
  rank: string
  join_date: number
  xp: number
}
export interface Clan {
  clan_id: number
  clan_name: string
  clan_create_date: number
  clan_xp: string
  clan: ReadonlyArray<ClanMember>
}

export interface Weapon {
  name: string
}

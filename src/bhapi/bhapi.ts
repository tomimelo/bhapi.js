import {
  BrawlhallaAPIConfig,
  Clan,
  Legend,
  LegendData,
  Player,
  PlayerRankedData,
  PlayerStats,
  Ranking,
  RankingsOptions,
  SteamId64,
  Weapon,
} from './types'
import { AxiosInstance } from 'axios'
import { RANKINGS_OPTIONS } from './constants'
import { apiClient } from '../api/client'

export class BrawlhallaAPI {
  private api: AxiosInstance
  public constructor(private readonly config: BrawlhallaAPIConfig) {
    this.validateConfig()
    this.api = apiClient
    this.api.defaults.params = {
      api_key: this.config.apiKey,
    }
  }

  public async searchBySteamID(steamId: SteamId64): Promise<Player> {
    const { data } = await this.api.get<Player>('/search', {
      params: {
        steamid: steamId,
      },
    })
    return data
  }

  public async getRankings({ bracket, region, page, name }: RankingsOptions = RANKINGS_OPTIONS): Promise<ReadonlyArray<Ranking>> {
    const { data } = await this.api.get<ReadonlyArray<Ranking>>(`/rankings/${bracket}/${region}/${page}`, {
      params: {
        name,
      },
    })
    return data
  }

  public async getPlayerStats(brawlhallaId: number): Promise<PlayerStats> {
    const { data } = await this.api.get<PlayerStats>(`/player/${brawlhallaId}/stats`)
    return data
  }

  public async getPlayerRankedData(brawlhallaId: number): Promise<PlayerRankedData> {
    const { data } = await this.api.get<PlayerRankedData>(`/player/${brawlhallaId}/ranked`)
    return data
  }

  public async getClan(clanId: number): Promise<Clan> {
    const { data } = await this.api.get<Clan>(`/clan/${clanId}`)
    return data
  }

  public async getLegends(): Promise<ReadonlyArray<LegendData>> {
    const { data } = await this.api.get<ReadonlyArray<LegendData>>(`/legend/all`)
    return data
  }

  public async getLegend(legendId: number): Promise<Legend> {
    const { data } = await this.api.get<Legend>(`/legend/${legendId}`)
    return data
  }

  public async getWeapons(): Promise<ReadonlyArray<Weapon>> {
    const legendsData = await this.getLegends()

    const weaponsSet = legendsData.reduce<Set<string>>(
      (set, legend) => set.add(legend.weapon_one).add(legend.weapon_two),
      new Set(),
    )
    return Array.from(weaponsSet).map((name) => ({ name }))
  }

  private validateConfig(): void {
    if (this.config === undefined || this.config.apiKey === undefined) {
      throw new Error(
        'A Brawlhalla API key is required in the config. If you do not have an API key, please read: https://dev.brawlhalla.com/#authentication',
      )
    }
    if (typeof this.config.apiKey !== 'string') {
      throw new Error('The API key is invalid. Please provide a valid one')
    }
  }
}

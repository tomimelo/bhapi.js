import {
  BrawlhallaAPIConfig,
  BrawlhallaBadResponse,
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
    try {
      const { data } = await this.api.get<Player>('/search', {
        params: {
          steamid: steamId,
        },
      })

      if (Array.isArray(data) || !data || !data.brawlhalla_id) {
        throw new Error('Player not found')
      }

      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getRankings({ bracket, region, page, name }: RankingsOptions = RANKINGS_OPTIONS): Promise<ReadonlyArray<Ranking>> {
    try {
      const { data } = await this.api.get<ReadonlyArray<Ranking>>(`/rankings/${bracket}/${region}/${page}`, {
        params: {
          name,
        },
      })

      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getPlayerStats(brawlhallaId: number): Promise<PlayerStats> {
    try {
      const { data } = await this.api.get<PlayerStats>(`/player/${brawlhallaId}/stats`)

      if ((typeof data === 'object' && Object.keys(data).length === 0) || !data || !Array.isArray(data)) {
        throw new Error('Player not found')
      }

      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getPlayerRankedData(brawlhallaId: number): Promise<PlayerRankedData> {
    try {
      const { data } = await this.api.get<PlayerRankedData>(`/player/${brawlhallaId}/ranked`)

      if ((typeof data === 'object' && Object.keys(data).length === 0) || !data || !Array.isArray(data)) {
        throw new Error('Player not found')
      }

      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getClan(clanId: number): Promise<Clan> {
    try {
      const { data } = await this.api.get<Clan>(`/clan/${clanId}`)

      if ((typeof data === 'object' && Object.keys(data).length === 0) || !data || !Array.isArray(data)) {
        throw new Error('Clan not found')
      }

      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getLegends(): Promise<ReadonlyArray<LegendData>> {
    try {
      const { data } = await this.api.get<ReadonlyArray<LegendData>>(`/legend/all`)
      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getLegend(legendId: number): Promise<Legend> {
    try {
      const { data } = await this.api.get<Legend>(`/legend/${legendId}`)
      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getWeapons(): Promise<ReadonlyArray<Weapon>> {
    try {
      const legendsData = await this.getLegends()

      const weaponsSet = legendsData.reduce<Set<string>>(
        (set, legend) => set.add(legend.weapon_one).add(legend.weapon_two),
        new Set(),
      )
      return Array.from(weaponsSet).map((name) => ({ name }))
    } catch (error) {
      this.handleError(error)
    }
  }

  private validateConfig(): void {
    if (this.config === undefined || !this.config.apiKey) {
      throw new Error(
        'A Brawlhalla API key is required in the config. If you do not have an API key, please read: https://dev.brawlhalla.com/#authentication',
      )
    }
    if (typeof this.config.apiKey !== 'string') {
      throw new Error('The API key is invalid. Please provide a valid one')
    }
  }

  private handleError(error: any): never {
    if (error.response) {
      this.handleBrawlhallaError(error.response.data)
    }
    throw error
  }

  private handleBrawlhallaError(error: BrawlhallaBadResponse): never {
    throw new Error(error.error.message)
  }
}

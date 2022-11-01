import { BrawlhallaAPIConfig, Player, Ranking, RankingsOptions, SteamId64 } from './types'
import axios, { AxiosInstance } from 'axios'
import { RANKINGS_OPTIONS } from './constants'

export class BrawlhallaAPI {
  private api: AxiosInstance
  public constructor(private readonly config: BrawlhallaAPIConfig) {
    this.api = axios.create({ baseURL: 'https://api.brawlhalla.com', params: { api_key: this.config.apiKey } })
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
}

import { expect } from 'chai'
import MockAdapter from 'axios-mock-adapter'
import { BrawlhallaAPI } from './bhapi'
import { BrawlhallaAPIConfig, Weapon } from './types'
import { apiClient } from '../api/client'

describe(BrawlhallaAPI.name, () => {
  let bhapi: BrawlhallaAPI
  let mockAdapter: MockAdapter

  before(() => {
    mockAdapter = new MockAdapter(apiClient)
  })

  beforeEach(() => {
    mockApiResponse({})
    bhapi = new BrawlhallaAPI({ apiKey: 'my-api-key' })
  })

  describe('when instantiating BrawlhallaAPI', () => {
    describe('and the config is invalid', () => {
      describe('given is undefined', () => {
        it('should throw an error', () => {
          expect(() => new BrawlhallaAPI(undefined as unknown as BrawlhallaAPIConfig)).to.throw(
            Error,
            'A Brawlhalla API key is required',
          )
        })
      })

      describe('given the api key is undefined', () => {
        it('should throw an error', () => {
          expect(() => new BrawlhallaAPI({} as BrawlhallaAPIConfig)).to.throw(Error, 'A Brawlhalla API key is required')
        })
      })
    })
  })

  describe('searchBySteamID', () => {
    describe('given the player has not played the game', () => {
      beforeEach(() => {
        mockApiResponse([])
      })
      it('should throw an error', async () => {
        await expect(bhapi.searchBySteamID('some-id')).to.be.rejectedWith(Error, 'Player not found')
      })
    })
  })

  describe('getPlayerStats', () => {
    describe('given the provided brawlhalla id does not exist', () => {
      beforeEach(() => {
        mockApiResponse({})
      })
      it('should throw an error', async () => {
        await expect(bhapi.getPlayerStats(99999999999999)).to.be.rejectedWith(Error, 'Player not found')
      })
    })
  })

  describe('getPlayerRankedData', () => {
    describe('given the provided brawlhalla id does not exist', () => {
      beforeEach(() => {
        mockApiResponse({})
      })
      it('should throw an error', async () => {
        await expect(bhapi.getPlayerRankedData(99999999999999)).to.be.rejectedWith(Error, 'Player not found')
      })
    })
  })

  describe('getClan', () => {
    describe('given the provided clan id does not exist', () => {
      beforeEach(() => {
        mockApiResponse({})
      })
      it('should throw an error', async () => {
        await expect(bhapi.getClan(99999999999999)).to.be.rejectedWith(Error, 'Clan not found')
      })
    })
  })

  describe('getWeapons', () => {
    beforeEach(() => {
      mockApiResponse([
        {
          legend_id: 3,
          legend_name_key: 'bodvar',
          bio_name: 'Bödvar',
          bio_aka: 'The Unconquered Viking, The Great Bear',
          weapon_one: 'Hammer',
          weapon_two: 'Sword',
          strength: '6',
          dexterity: '6',
          defense: '5',
          speed: '5',
        },
        {
          legend_id: 4,
          legend_name_key: 'cassidy',
          bio_name: 'Cassidy',
          bio_aka: 'The Marshal of the Old West',
          weapon_one: 'Pistol',
          weapon_two: 'Hammer',
          strength: '6',
          dexterity: '8',
          defense: '4',
          speed: '4',
        },
      ])
    })

    it('should return all possible weapons from legends', async () => {
      const expectedWeapons: ReadonlyArray<Weapon> = [{ name: 'Hammer' }, { name: 'Sword' }, { name: 'Pistol' }]
      const weapons = await bhapi.getWeapons()
      expect(weapons).to.be.deep.equal(expectedWeapons)
    })
  })

  function mockApiResponse(response: any): void {
    mockAdapter.reset()
    mockAdapter.onAny().reply(200, response)
  }
})

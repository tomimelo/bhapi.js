import { expect } from 'chai'
import { BrawlhallaAPI } from './bhapi'
import { BrawlhallaAPIConfig } from './types'

describe(BrawlhallaAPI.name, () => {
  let bhapi: BrawlhallaAPI

  beforeEach(() => {
    bhapi = new BrawlhallaAPI({ apiKey: '' })
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
})

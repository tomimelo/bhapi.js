import axios from 'axios'

export const apiClient = axios.create({ baseURL: 'https://api.brawlhalla.com' })

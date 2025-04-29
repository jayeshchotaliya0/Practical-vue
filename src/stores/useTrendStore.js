import { defineStore } from 'pinia'
import trends from '../data/trends.json'
import trendsHistory from '../data/trends-history.json'

export const useTrendStore = defineStore('trend', {
  state: () => ({
    trendData: null,
    historyData: [],
    allTrendData: {},
    loading: false,
  }),
  actions: {
    async fetchTrendData(locationId) {
      this.loading = true
      this.trendData = trends[locationId]?.current || null
      this.historyData = trendsHistory[locationId]?.history || []
      this.loading = false
    },
    async fetchAllTrendData() {
      this.loading = true
      this.allTrendData = trends
      this.loading = false
    },
    
  },
})

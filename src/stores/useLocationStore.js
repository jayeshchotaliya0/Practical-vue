import { defineStore } from 'pinia'
import locations from '../data/locations.json'

export const useLocationStore = defineStore('location', {
  state: () => ({
    locations: locations, // load static location.json
    selectedLocation: 0, // first location selected by default
  }),
  actions: {
    setSelectedLocation(id) {
      this.selectedLocation = id
    }
  },
})

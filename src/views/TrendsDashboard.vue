<template>
  <div class="p-6">
    <LocationDropdown />
    <div class="mt-6">
      <MetricsCards v-if="!trendStore.loading" />
      <Loader v-else />
    </div>
    <div class="mt-10">
      <TrendsChart v-if="!isLoading" />
      <Loader v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LocationDropdown from '../components/LocationDropdown.vue'
import TrendsChart from '../components/TrendsChart.vue'
import { useLocationStore } from '../stores/useLocationStore'
import { useTrendStore } from '../stores/useTrendStore'
import Loader from '../components/Loader.vue'

const locationStore = useLocationStore()
const trendStore = useTrendStore()
const isLoading = ref(true)

onMounted(async () => {
  // Fetch trend data when component is mounted
  await trendStore.fetchTrendData(locationStore.selectedLocationId)
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})


</script>

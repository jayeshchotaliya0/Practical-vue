<template>
  <div class="flex items-start justify-between bg-white p-6 rounded-lg shadow border">
    <!-- Left Section -->
    <div v-if="trendStore.loading" class="mt-4">Loading trend data... {{ trendStore.length }}</div>
    <div class="flex items-start gap-4">
      <img src="/image/Ellipse.png" alt="Logo" class="w-16 h-16 rounded-full border" />
      <div>
        <select @change="onChange" class="p-2 border rounded-lg w-full">
          <option v-for="loc in locationStore.locations" :key="loc.id" :value="loc.id">
            {{ loc.location_name }}
          </option>
        </select>
      
        <div class="flex items-center gap-1 text-sm text-gray-600">
          <span class="text-sm font-semibold text-gray-700 mr-1">{{ rating }}</span>
          <div class="flex items-center gap-0.5">
            <div v-for="i in 5" :key="i" class="w-4 h-4">
              <svg v-if="rating >= i" class="text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 
          3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 
          1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.2 
          3.674c.3.921-.755 1.688-1.54 
          1.118l-3.124-2.27a1 1 0 00-1.176 
          0l-3.124 2.27c-.784.57-1.838-.197-1.539-1.118l1.2-3.674a1 
          1 0 00-.364-1.118L2.35 
          9.1c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 
          00.95-.69l1.2-3.674z" />
              </svg>
              <svg v-else-if="rating >= i - 0.5" class="text-yellow-400" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.571 8.332 
          1.151-6.064 5.858 1.501 8.278L12 
          18.896V.587z" />
              </svg>
              <svg v-else class="text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 
          0l1.2 3.674a1 1 0 00.95.69h3.862c.969 
          0 1.371 1.24.588 
          1.81l-3.124 2.27a1 1 0 00-.364 
          1.118l1.2 
          3.674c.3.921-.755 1.688-1.54 
          1.118l-3.124-2.27a1 1 0 00-1.176 
          0l-3.124 2.27c-.784.57-1.838-.197-1.539-1.118l1.2-3.674a1 
          1 0 00-.364-1.118L2.35 
          9.1c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 
          00.95-.69l1.2-3.674z" />
              </svg>
            </div>
          </div>

          <span class="ml-1 text-sm text-gray-500">(100)</span>
        </div>
        <p class="text-sm text-gray-600">{{ locationName }}</p>
        <p class="text-sm text-gray-600">{{ primaryPhone }}</p>
        <div class="flex items-center gap-4 mt-1 text-sm">
          <a :href="websiteUrl" class="text-green-600 underline">{{ websiteUrl?websiteUrl:'--' }}</a>
           <a :href="mapUrl" class="text-blue-600 underline">Google Map</a>
        </div>
      </div>
    </div>

    <!-- Right Stats Section -->
    <div class="grid grid-cols-3 gap-4 text-sm">
      <!-- Average Ranking -->
      <div
        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 text-center  transform hover:scale-105">
        <div class="flex justify-center mb-2">
          <i class="fas fa-chart-line text-cyan-600 text-2xl"></i>
        </div>
        <p class="text-2xl font-bold text-cyan-600">
          {{ (trendStore?.trendData?.average / 5).toFixed(1) }}
        </p>
        <p class="text-gray-600 font-medium">Average Ranking</p>
      </div>

      <!-- Top 3% -->
      <div
        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105">
        <div class="flex justify-center mb-2">
          <i class="fas fa-trophy text-yellow-500 text-2xl"></i>
        </div>
        <p class="text-2xl font-bold text-yellow-500">
          {{ trendStore?.trendData?.top_3_position }}%
        </p>
        <p class="text-gray-600 font-medium">Top 3%</p>
        <p class="text-xs text-gray-400">{{ trendStore?.trendData?.top_3_percentage }}%</p>
      </div>

      <!-- Market Share -->
      <div
        class="bg-white border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105">
        <div class="flex justify-center mb-2">
          <i class="fas fa-bullseye text-red-500 text-2xl"></i>
        </div>
        <p class="text-2xl font-bold text-red-500">
          {{ trendStore?.trendData?.market_share_position }}%
        </p>
        <p class="text-gray-600 font-medium">Market Share</p>
        <p class="text-xs text-red-400">{{ trendStore?.trendData?.market_share_percentage }}%</p>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useLocationStore } from '../stores/useLocationStore'
import { useTrendStore } from '../stores/useTrendStore'
import { onMounted, computed,ref } from 'vue'

const rating = ref(3.5);
const locationName = ref('');
const primaryPhone = ref('');
const websiteUrl = ref('');
const mapUrl = ref('');

const locationStore = useLocationStore()
const trendStore = useTrendStore();

const updateLocationData = (locationId) => {
  const filteredData = locationStore?.locations.find(item => item.id === locationId);
  if (filteredData) {
    locationName.value = filteredData.location_name || '';
    primaryPhone.value = filteredData.primary_phone || '';
    websiteUrl.value = filteredData.website_url || '';
    mapUrl.value = filteredData.map_url || '';
  }
};

const onChange = async (e) => {
  const id = Number(e.target.value)
  updateLocationData(id); 
  locationStore.setSelectedLocation(id)
  await trendStore.fetchTrendData(id)
  const averageCount = trendStore?.trendData?.average;
  rating.value = averageCount / 5;
}

onMounted(async () => {
  await trendStore.fetchAllTrendData();
  const filteredData = locationStore?.locations.find(item => item.id === 6);
  updateLocationData(6); 
})
</script>

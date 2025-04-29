<template>
  <div class="ranking-chart p-4 border border-blue-400 rounded-md">
    <h2 class="text-lg font-semibold mb-4">Ranking Position</h2>

    <!-- Metric Selection -->
    <div class="flex items-center gap-6 mb-6">
      <label>
        <input type="radio" value="average_position" v-model="selectedMetric" />
        Average Position
      </label>
      <label>
        <input type="radio" value="top_3_percentage" v-model="selectedMetric" />
        Top 3%
      </label>
      <label>
        <input type="radio" value="market_share_percentage" v-model="selectedMetric" />
        Market Share
      </label>
    </div>

    <!-- Chart -->
    <VueApexCharts 
      v-if="isChartReady"
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTrendStore } from '../stores/useTrendStore'
import { useLocationStore } from '../stores/useLocationStore'

const trendStore = useTrendStore()
const locationStore = useLocationStore()
const selectedMetric = ref('average_position')
const series = ref([])
const isChartReady = ref(false)

const chartOptions = ref({
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: false }
  },
  title: {
    text: 'Ranking Position',
    align: 'left'
  },
  colors: ['#00B746'],
  markers: {
    size: 6,
    colors: ['#ffffff'],
    strokeColor: '#00B746',
    strokeWidth: 3
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'straight', width: 2 },
  fill: { type: 'solid', opacity: 0.2 },
  xaxis: { categories: [] },
  yaxis: {
    reversed: true,
    min: 0,
    max: 140
  },
  legend: {
    show: true,
    markers: {
      fillColors: ['#00B746']
    }
  }
})

const updateChart = (type) => {
  const data = trendStore?.historyData || []
  const sortedData = data?.slice().sort((a, b) => new Date(a?.execution_date) - new Date(b?.execution_date))
  series.value = [
    {
      name: getLabel(type ? type : selectedMetric?.value),
      data: sortedData?.map(item => item[selectedMetric?.value] ?? 0)
    }
  ]

  chartOptions.value.xaxis.categories = sortedData.map(item =>
    new Date(item.execution_date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })
  )

  isChartReady.value = true
}

const getLabel = (metric) => {
  switch (metric) {
    case 'average_position':
      return 'Average Position'
    case 'top_3_percentage':
      return 'Top 3%'
    case 'market_share_percentage':
      return 'Market Share'
    default:
      return ''
  }
}

const loadChartData = async (id) => {
  isChartReady.value = false
  await trendStore.fetchTrendData(id)
  selectedMetric.value = 'market_share_percentage'
  updateChart('market_share_percentage')
}

watch(
  () => locationStore.selectedLocation,
  async (newId) => {
    if (newId !== undefined) {
      await loadChartData(newId)
    }
  },
  { immediate: true }
)

watch(selectedMetric, () => {
  updateChart()
})

onMounted(async () => {
  await trendStore.fetchAllTrendData()
  await loadChartData(locationStore.selectedLocation || 6)
  await updateChart()
})
</script>


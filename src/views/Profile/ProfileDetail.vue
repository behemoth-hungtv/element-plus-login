<template>
  <div>
    <el-card
      v-if="showDetailsCard"
      :body-style="{ maxHeight: '80vh', overflow: 'auto', padding: '1rem' }"
    >
      <template #header>
        <div class="card-header">
          <span>Details</span>
          <div class="cursor-pointer" circle @click="toggleDetailsCard">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </template>
      <el-table :data="imageDetails" style="width: 100%">
        <el-table-column prop="key" label="Detail" width="180" />
        <el-table-column prop="value" label="Value">
          <template #default="scope">
            <span v-if="scope.row.value === 'refreshButton'">
              <span @click="refresh" class="cursor-pointer text-blue">
                <el-icon class="me-2"><Refresh /></el-icon>Refresh</span
              >
            </span>
            <span v-else>
              {{ scope.row.value }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
  showDetailsCard: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggleDetailsCard'])

const imageDetails = ref([
  {
    key: 'New fingerprint',
    value: 'refreshButton'
  },
  { key: 'Profile name', value: 'type-zoo' },
  { key: 'Browser', value: 'Chrome' },
  { key: 'Browser version', value: '124' },
  { key: 'OS', value: 'Mac OS' },
  { key: 'Proxy', value: 'Without Proxy' },
  { key: 'Timezone', value: 'Asia/Bangkok' },
  { key: 'Web RTC', value: 'Real' },
  { key: 'Screen Resolution', value: '1024,768' },
  { key: 'Canvas', value: 'Off' },
  { key: 'Client Rects', value: 'Noise' },
  { key: 'Audio Context', value: 'Noise' },
  { key: 'Font', value: 'Noise' },
  { key: 'WebGL', value: 'Noise' },
  { key: 'WebGL Vendor', value: 'Google Inc. (NVIDIA)' },
  {
    key: 'WebGL Renderer',
    value: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Ti (0x00002489) Direct3D11 vs_5_0 ps_5_0, D3D11)'
  },
  { key: 'Start URL', value: '﻿' }
])

function toggleDetailsCard() {
  emit('toggleDetailsCard')
}

function refresh() {
  console.log('refresh')
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <el-form label-position="top" style="max-width: unset">
    <div class="flex justify-start">
      <el-form-item label="Múi giờ">
        <el-checkbox v-model="formData.useIPTimeZone">Điền múi giờ dựa vào IP</el-checkbox>
      </el-form-item>
    </div>

    <el-select
      v-if="!formData.useIPTimeZone"
      v-model="formData.timeZone"
      placeholder="Chọn múi giờ"
    >
      <el-option
        v-for="option in timeZonesOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>

    <el-form-item class="mt-3" label="Định Vị Địa Lý">
      <el-select v-model="formData.location">
        <el-option label="Prompt" value="prompt" />
        <el-option label="Allow" value="allow" />
        <el-option label="Block" value="block" />
      </el-select>
    </el-form-item>

    <el-checkbox v-model="formData.enableLocationTracking"
      >Điền Vị Trí Địa Lý Dựa Vào IP</el-checkbox
    >
    <section class="mt-3">
      <el-form-item label="Vĩ Độ">
        <el-input v-model="formData.latitude" />
      </el-form-item>

      <el-form-item label="Kinh Độ">
        <el-input v-model="formData.longitude" />
      </el-form-item>

      <el-form-item label="Độ Chính Xác (mét)">
        <el-input v-model="formData.accuracy" />
      </el-form-item>
    </section>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import moment from 'moment-timezone'

const formData = ref({
  useIPTimeZone: true,
  timeZone: '',
  location: '',
  enableLocationTracking: false,
  latitude: '',
  longitude: '',
  accuracy: ''
})

const timeZones = moment.tz.names()

function formatOffset(offset) {
  const sign = offset >= 0 ? '+' : '-'
  const absOffset = Math.abs(offset)
  const hours = Math.floor(absOffset / 60)
  const minutes = absOffset % 60
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const timeZonesOptions = timeZones.map((timeZone) => {
  const zone = moment.tz.zone(timeZone)
  const offset = formatOffset(zone.utcOffset(new Date()))
  return { label: `${timeZone} (GMT${offset})`, value: timeZone }
})
</script>

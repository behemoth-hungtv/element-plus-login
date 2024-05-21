<template>
  <el-form label-position="top">
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
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import moment from 'moment-timezone'

const formData = ref({
  useIPTimeZone: true,
  timeZone: ''
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

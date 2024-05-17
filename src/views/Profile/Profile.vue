<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import FunctionalSection from '@/views/Profile/FunctionalSection.vue'
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const tabsData = [
  { name: 'first', label: 'Cloud', component: FunctionalSection },
  { name: 'second', label: 'Local' },
  { name: 'third', label: 'Group' },
  { name: 'fourth', label: 'Team' }
]
</script>

<template>
  <ContentWrap>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabsData" :name="tab.name" :key="tab.name">
        <template #label>
          <div class="circle"> <span class="number">10</span> </div>
          <div>{{ tab.label }}</div>
        </template>
        <component :is="tab.component" ref="panelsRef" />
      </el-tab-pane>
    </el-tabs>
  </ContentWrap>
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-tabs__content {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
// Define variables for circle size, colors, and number style
$circle-size: 18px;
$circle-color: #f0f0f0; // Light grey
$number-color: #333; // Dark grey
$number-font-size: 13px;

.circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  background-color: $circle-color;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  // Styles for the number inside the circle
  .number {
    color: $number-color;
    font-size: $number-font-size;
  }
}
</style>

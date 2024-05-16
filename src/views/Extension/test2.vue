<template>
  <div class="relative">
    <BaseButton type="primary"> Start </BaseButton>

    <el-dropdown>
      <el-button class="ml-3 mt-[2px]" link type="primary">
        <el-icon> <More /> </el-icon
      ></el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-popconfirm title="Are you sure to delete this?">
              <template #reference>
                <el-button>
                  <el-icon class="me-2"> <Delete /> </el-icon>Delete</el-button
                >
              </template>
            </el-popconfirm>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button plain @click="$emit('openDetails')"
              ><el-icon class="me-2"> <Edit /> </el-icon> Detail
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'

import { ref } from 'vue'
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>

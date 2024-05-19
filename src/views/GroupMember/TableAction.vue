<template>
  <div class="relative">
    <el-popconfirm title="Are you sure to delete this?">
      <template #reference>
        <el-button>
          <el-icon class="me-2"> <Delete /> </el-icon>Delete</el-button
        >
      </template>
    </el-popconfirm>
    <el-button plain @click="$emit('openDetails')"
      ><el-icon class="me-2"> <Edit /> </el-icon> Detail
    </el-button>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>

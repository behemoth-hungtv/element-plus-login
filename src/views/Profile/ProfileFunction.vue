<script setup lang="ts">
const functionButtonsData = [
  {
    id: 1,
    text: 'Start 1 profiles',
    action: 'startProfiles',
    type: 'primary',
    iconClass: 'play-icon',
    icon: 'CaretRight',
    method: () => {}
  },
  {
    id: 2,
    text: 'Stop 1 profiles',
    action: 'stopProfiles',
    iconClass: 'stop-icon',
    type: 'danger',
    plain: true,
    icon: 'CircleClose',
    method: () => {}
  },
  {
    id: 3,
    text: 'Assign to group',
    action: 'assignGroup',
    iconClass: 'user-plus-icon',
    type: 'primary',
    icon: 'User',
    method: () => {}
  },
  {
    id: 4,
    text: 'Share profiles',
    action: 'shareProfiles',
    iconClass: 'share-icon',
    type: 'primary',
    icon: 'Share',
    method: () => {}
  },
  {
    id: 5,
    text: 'Check proxy',
    action: 'checkProxy',
    iconClass: 'check-icon',
    type: 'primary',
    icon: 'Check',
    method: () => {}
  },
  {
    id: 6,
    text: 'Start with app',
    action: 'startWithApp',
    iconClass: 'start-app-icon',
    type: 'primary',
    plain: true,
    icon: 'CaretRight',
    method: () => {}
  },
  {
    id: 7,
    text: 'Update proxy',
    action: 'updateProxy',
    iconClass: 'update-icon',
    type: 'primary',
    plain: true,
    icon: 'Refresh',
    method: () => {}
  },
  {
    id: 8,
    text: 'Update profiles',
    action: 'updateProfiles',
    iconClass: 'update-profiles-icon',
    type: 'primary',
    plain: true,
    icon: 'RefreshRight',
    method: () => {}
  },
  {
    id: 9,
    text: 'Share on cloud',
    action: 'shareOnCloud',
    iconClass: 'cloud-icon',
    type: 'danger',
    plain: true,
    icon: 'Upload',
    method: () => {}
  },
  {
    id: 10,
    text: 'New Finger Print',
    action: 'newFingerPrint',
    iconClass: 'icon-class',
    type: 'success',
    plain: true,
    icon: 'HelpFilled',
    method: () => {}
  }
]
</script>
<template>
  <section class="functional-section flex flex-wrap gap-3.5 mt-3 justify-center">
    <el-button
      v-for="(data, index) in functionButtonsData"
      :key="index"
      :type="data.type"
      @click="data.method"
      plain
      class="mx-0"
    >
      <el-icon class="me-2"><component :is="data.icon"></component></el-icon>
      {{ data.text }}
    </el-button>

    <el-dropdown>
      <el-button class="ml-3 mt-[2px]" link type="primary"
        ><el-icon><More /></el-icon
      ></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-button link type="primary">
              <el-icon><Edit /></el-icon>
              菜单权限
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </section>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>

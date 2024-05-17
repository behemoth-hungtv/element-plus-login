<script setup lang="ts">
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useAppStore } from '@/store/modules/app'
import { Footer } from '@/components/Footer'
import { computed, ref } from 'vue'
import { useIcon } from '@/hooks/web/useIcon'

const appStore = useAppStore()

const footer = computed(() => appStore.getFooter)

const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedViews
})

const functionButtonsData = ref([
  {
    id: 1,
    text: 'Start 1 profiles',
    action: 'startProfiles',
    type: 'primary',
    iconClass: 'play-icon',
    icon: 'mdi:account-group' // Icon for starting profiles
  },
  {
    id: 2,
    text: 'Stop 1 profiles',
    action: 'stopProfiles',
    iconClass: 'stop-icon',
    type: 'danger',
    plain: true,
    icon: 'mdi:stop-circle' // Icon for stopping profiles
  },
  {
    id: 3,
    text: 'Assign to group',
    action: 'assignGroup',
    iconClass: 'user-plus-icon',
    type: 'primary',
    icon: 'mdi:account-plus' // Icon for assigning to a group
  },
  {
    id: 4,
    text: 'Share profiles',
    action: 'shareProfiles',
    iconClass: 'share-icon',
    type: 'primary',
    icon: 'mdi:share-variant' // Icon for sharing profiles
  },
  {
    id: 5,
    text: 'Check proxy',
    action: 'checkProxy',
    iconClass: 'check-icon',
    type: 'primary',
    icon: 'mdi:check-circle' // Icon for checking proxy
  },
  {
    id: 6,
    text: 'Start with app',
    action: 'startWithApp',
    iconClass: 'start-app-icon',
    type: 'primary',
    plain: true,
    icon: 'mdi:play-circle' // Icon for starting with the app
  },
  {
    id: 7,
    text: 'Update proxy',
    action: 'updateProxy',
    iconClass: 'update-icon',
    type: 'primary',
    plain: true,
    icon: 'mdi:sync' // Icon for updating proxy
  },
  {
    id: 8,
    text: 'Update profiles',
    action: 'updateProfiles',
    iconClass: 'update-profiles-icon',
    type: 'primary',
    plain: true,
    icon: 'mdi:refresh' // Icon for updating profiles
  },
  {
    id: 9,
    text: 'Share on cloud',
    action: 'shareOnCloud',
    iconClass: 'cloud-icon',
    type: 'danger',
    plain: true,
    icon: 'mdi:cloud-upload' // Icon for sharing on cloud
  },
  {
    id: 10,
    text: 'New Finger Print',
    action: 'newFingerPrint',
    iconClass: 'icon-class',
    type: 'success',
    plain: true,
    icon: 'mdi:fingerprint' // Icon for new fingerprint
  }
])
</script>

<template>
  <section
    :class="[
      'flex-1 p-[var(--app-content-padding)] w-[calc(100%-var(--app-content-padding)-var(--app-content-padding))] bg-[var(--app-content-bg-color)] dark:bg-[var(--el-bg-color)]'
    ]"
  >
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </router-view>

    <div>
      <!-- <el-button
        v-for="(data, index) in functionButtonsData"
        :key="index"
        :type="data.type"
        plain
        :icon="useIcon({ icon: data.icon })"
        class="mx-0"
      >
        {{ data.text }}
      </el-button> -->
      
      <el-dropdown>
        <el-button
          class="ml-3 mt-[2px]"
          link
          type="primary"
          :icon="useIcon({ icon: 'mdi:dots-horizontal' })"
        ></el-button>
        
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button link type="primary">
                菜单权限
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </section>
  <Footer v-if="footer" />
</template>

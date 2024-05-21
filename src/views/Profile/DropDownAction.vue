<script lang="ts" setup>
import { useI18n } from '@/hooks/web/useI18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import ShareProfile from '@/views/Profile/Form/ShareProfile.vue'
import ChangeOwner from '@/views/Profile/Form/ChangeOwner.vue'

const { t } = useI18n()
const router = useRouter()

const exportCookies = () => {
  console.log('exportCookies')
}

const props = defineProps({
  record: {
    type: null,
    default: () => {}
  }
})

const onDeleteProfile = () => {
  ElMessageBox.confirm(t('common.delMessage'), t('common.delWarning'), {
    confirmButtonText: t('common.delOk'),
    cancelButtonText: t('common.delCancel'),
    type: 'warning'
  }).then(async () => {
    // call delete api

    console.log('record', props.record)

    if (true) {
      ElMessage.success(t('common.delSuccess'))
    }
  })
}

const handleEdit = () => {
  router.push('/create_profile')
}
</script>

<template>
  <div class="relative">
    <el-button type="primary" plain> Start </el-button>

    <el-dropdown>
      <el-button class="ml-3 mt-[2px]" link type="primary">
        <el-icon> <More /> </el-icon
      ></el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-button type="default" text @click="handleEdit"
              ><el-icon class="me-2"> <Edit /> </el-icon> Chỉnh sửa
            </el-button>
          </el-dropdown-item>

          <el-dropdown-item>
            <ShareProfile></ShareProfile>
          </el-dropdown-item>

          <el-dropdown-item>
            <el-button type="default" text @click="exportCookies"
              ><el-icon class="me-2"> <Edit /> </el-icon> Xuất Cookies
            </el-button>
          </el-dropdown-item>

          <el-dropdown-item>
            <ChangeOwner></ChangeOwner>
          </el-dropdown-item>

          <el-dropdown-item>
            <el-button type="danger" text @click="onDeleteProfile">
              <el-icon class="me-2"> <Delete /> </el-icon> Xoá
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>

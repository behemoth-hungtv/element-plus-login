''
<template>
  <el-form label-position="top">
    Loại Proxy:

    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Min-Proxy" name="minproxy"
        ><div class="flex justify-start">
          <el-form-item label="Proxy Manager">
            <el-select
              style="width: 400px"
              v-model="formData.proxyManager"
              placeholder="Select Proxy Manager"
              class="inline"
            >
              <el-option
                v-for="option in proxyManagerOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>

            <el-button class="ms-2" type="primary" @click="buyProxy"
              ><el-icon class="me-2"> <Edit /> </el-icon> Mua Proxy
            </el-button>
          </el-form-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Proxy Của Bạn" name="yourproxy"><YourProxy></YourProxy></el-tab-pane>
      <el-tab-pane label="Không Dùng Proxy" name="noproxy"></el-tab-pane>
    </el-tabs>

    <el-form-item>
      <template #label>
        <span>WebRTC</span
        ><el-tooltip
          width="200px"
          placement="top"
          content="Forward Google: Used for high-security websites (Ebay, Discord) <br>
  Forward: Used for medium-security websites
  Disable: Hide all WebRTC"
          raw-content
        >
          <el-icon class="ms-2" color="#66b1ff"><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-select v-model="formData.webrtcOption" placeholder="Select WebRTC option">
        <el-option
          v-for="option in webrtcOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import YourProxy from '@/views/CreateProfile/Form/YourProxy.vue'

const activeName = ref('minproxy')
const router = useRouter()

const formData = ref({
  webrtcOption: '',
  proxyManager: ''
})

const webrtcOptions = [
  { label: 'Real', value: 'real' },
  { label: 'Disabled', value: 'disabled' },
  { label: 'Alter', value: 'alter' },
  { label: 'Forward Google', value: 'forward-google' },
  { label: 'Forward', value: 'forward' }
]

const proxyManagerOptions = [
  { label: 'Proxy Manager 1', value: 'proxy-manager-1' },
  { label: 'Proxy Manager 2', value: 'proxy-manager-2' },
  { label: 'Proxy Manager 3', value: 'proxy-manager-3' }
  // Add more proxy manager options as needed
]

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const buyProxy = () => {
  router.push('/proxy/index')
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

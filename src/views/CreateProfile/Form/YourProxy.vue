<template>
  <el-form-item label="Proxy Type" class="text-left">
    <el-select v-model="formData.proxyType" placeholder="Select Proxy Type">
      <el-option
        v-for="option in proxyTypeOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
    <small>Proxy sẽ dừng khi đóng Minlogin.</small>
  </el-form-item>

  <el-row :gutter="50">
    <el-col :span="12">
      <el-form-item label="Máy Chủ">
        <el-input v-model="formData.server" placeholder="Enter server" />
      </el-form-item>
    </el-col>

    <el-col :span="12"
      ><el-form-item label="Cổng Proxy">
        <el-input v-model="formData.proxyPort" placeholder="Enter proxy port" /> </el-form-item
    ></el-col>

    <el-col :span="12">
      <el-form-item label="Tên Người Dùng">
        <el-input v-model="formData.username" placeholder="Enter username" /> </el-form-item
    ></el-col>

    <el-col :span="12">
      <el-form-item label="Mật Khẩu">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="Enter password"
        /> </el-form-item
    ></el-col>
  </el-row>

  <el-row>
    <el-col>
      <el-form-item label="IP Checker Service">
        <el-select v-model="formData.ipCheckerService" placeholder="Select IP Checker Service">
          <el-option
            v-for="option in ipCheckerServiceOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col>
      <el-checkbox v-model="formData.enableIpChange">Kích hoạt thay đổi IP</el-checkbox>
    </el-col>

    <el-col>
      <el-form-item label="Change Proxy URL">
        <el-input v-model="formData.proxyUrl" placeholder="Enter Proxy URL"></el-input>
      </el-form-item>
    </el-col>

    <el-col>
      <el-button class="primary" plain @click="checkProxy"> Kiểm tra Proxy </el-button>

      <el-button class="default" text @click="resetProxy"> Xoá Proxy </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { cloneDeep } from 'lodash'

const proxyTypeOptions = [
  { label: 'HTTP', value: 'http' },
  { label: 'HTTPS', value: 'https' },
  { label: 'SOCKS5', value: 'socks5' },
  { label: 'SOCKS4', value: 'socks4' }
  // Add more proxy type options as needed
]

const ipCheckerServiceOptions = [
  { label: 'Service 1', value: 'service-1' },
  { label: 'Service 2', value: 'service-2' },
  { label: 'Service 3', value: 'service-3' }
  // Add more IP checker service options as needed
]

const defaultValue = {
  webrtcOption: '',
  proxyManager: '',
  proxyType: '',
  server: '',
  username: '',
  proxyPort: '',
  password: '',
  ipCheckerService: '',
  enableIpChange: false,
  proxyUrl: ''
}

const formData = ref(cloneDeep(defaultValue))
const checkProxy = () => {
  console.log('checkProxy')
}

const resetProxy = () => (formData.value = cloneDeep(defaultValue))
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

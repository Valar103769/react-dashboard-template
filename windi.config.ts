import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  // 在按需使用下预检样式 (样式重置)是启用的。如果需要禁用，可以按以下方式配置
  preflight: false,
})

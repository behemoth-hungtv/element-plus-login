import { NO_REDIRECT_WHITE_LIST } from '@/constants'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { useTitle } from '@/hooks/web/useTitle'
import { useAppStoreWithOut } from '@/store/modules/app'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from '@/store/modules/user'
import type { RouteRecordRaw } from 'vue-router'
import router from './router'

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

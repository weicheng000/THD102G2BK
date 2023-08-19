import { createI18n } from 'vue-i18n'
import zhTC from 'vxe-table/lib/locale/lang/zh-TC'
import enUS from 'vxe-table/lib/locale/lang/en-US'

const messages = {
  zh_TC: {
    ...zhTC
  },
  en_US: {
    ...enUS
  }
}

const i18n = createI18n({
  locale: 'zh_TC',
  messages,
})

export default i18n
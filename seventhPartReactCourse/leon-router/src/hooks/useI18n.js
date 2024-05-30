import { i18n } from "../consts"

export function useI18n(lang) {
  return i18n[lang] || i18n.en
}
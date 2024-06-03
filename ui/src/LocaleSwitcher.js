import React from 'react'
import { useLingui } from '@lingui/react'
import Locale from './locales'

function LocaleSwitcher() {
  const { i18n } = useLingui()

  const handleLocaleChange = (newLocale) => {
    i18n.activate(newLocale)
  }

  if (i18n.locale === Locale.ENGLISH) {
    return (
      <button onClick={() => handleLocaleChange(Locale.FRENCH)}>
        Français
      </button>
    )
  } else if (i18n.locale === Locale.FRENCH) {
    return (
      <button onClick={() => handleLocaleChange(Locale.ENGLISH)}>
        English
      </button>
    )
  }
}

export default LocaleSwitcher

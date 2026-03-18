import { createContext, useContext, useState, useCallback } from 'react'
import { translations } from '../data/translations'

// ─── Context ──────────────────────────────────────────────────────────────────
const LangContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en')

  const t = translations[lang]
  const isRTL = t.dir === 'rtl'

  const toggleLang = useCallback(() => {
    setLangState(prev => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  const setLang = useCallback((code) => {
    if (translations[code]) setLangState(code)
  }, [])

  return (
    <LangContext.Provider value={{ lang, t, isRTL, toggleLang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}

import { Link } from 'react-router-dom'
import { Home, Utensils } from 'lucide-react'
import { useLang } from '../context/LangContext'

export default function NotFound() {
  const { t, isRTL } = useLang()

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f5] text-center px-6"
      dir={t.dir}
    >
      {/* Decorative icon */}
      <div className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center mb-6 shadow-gold">
        <Utensils size={32} className="text-white" />
      </div>

      {/* 404 number */}
      <div className="font-display text-[120px] leading-none font-bold text-[#c8965a]/20 select-none mb-2">
        404
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1a1008] mb-3">
        {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
      </h1>
      <p className="text-stone-400 text-base max-w-sm mb-10 font-light">
        {isRTL
          ? 'يبدو أن هذه الصفحة غير موجودة. ربما تم نقلها أو حذفها.'
          : "The page you're looking for doesn't exist or has been moved."}
      </p>

      <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Link to="/" className="btn-primary">
          <Home size={15} />
          {isRTL ? 'الصفحة الرئيسية' : 'Back to Home'}
        </Link>
        <Link to="/menu" className="btn-outline">
          {isRTL ? 'تصفح القائمة' : 'Browse Menu'}
        </Link>
      </div>
    </main>
  )
}

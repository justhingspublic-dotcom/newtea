import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import PageLoader from './components/layout/PageLoader'

const placeholderPages = [
  {
    path: '/news',
    title: '杯杯好事',
    titleEn: 'Brand News',
    description: '品牌最新消息與活動情報，敬請期待。',
  },
  {
    path: '/about',
    title: '多麼用心',
    titleEn: 'Our Story',
    description: '了解我們對茶的堅持與用心，從產地到茶杯的每一步。',
  },
  {
    path: '/menu',
    title: '選茶點這',
    titleEn: 'Tea Menu',
    description: '精選台灣各地單品茶，找到屬於你的那杯好茶。',
  },
  {
    path: '/stores',
    title: '哪有茶香',
    titleEn: 'Store Locations',
    description: '尋找離你最近的樂台羽茶門市。',
  },
  {
    path: '/shop',
    title: '把茶帶走',
    titleEn: 'Online Shop',
    description: '線上商城即將上線，讓好茶宅配到府。',
  },
  {
    path: '/franchise',
    title: '羽您創業',
    titleEn: 'Franchise',
    description: '加盟樂台羽茶，一起讓好茶走入更多人的生活。',
  },
]

function App() {
  return (
    <Router basename="/newtea">
      <PageLoader />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {placeholderPages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <PlaceholderPage
                  title={page.title}
                  titleEn={page.titleEn}
                  description={page.description}
                />
              }
            />
          ))}
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

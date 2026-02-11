import HeroSection from '../components/home/HeroSection'
import BrandFeatures from '../components/home/BrandFeatures'
import PotBrewingShowcase from '../components/home/PotBrewingShowcase'
import FeaturedProducts from '../components/home/FeaturedProducts'
import ShopPreview from '../components/home/ShopPreview'
import OnlineOrderCTA from '../components/home/OnlineOrderCTA'
import LatestNews from '../components/home/LatestNews'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandFeatures />
      <PotBrewingShowcase />
      <FeaturedProducts />
      <ShopPreview />
      <OnlineOrderCTA />
      <LatestNews />
    </main>
  )
}

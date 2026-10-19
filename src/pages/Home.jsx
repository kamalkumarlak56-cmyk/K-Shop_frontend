import Hero from "@/components/Hero"
import HomeDiscovery from "@/components/HomeDiscovery"
import TodaysDeals from "@/components/TodaysDeals"
import Footer from "@/components/Footer"


const Home = () => {
  return (
    <main>
      <Hero />
      <TodaysDeals />
      <HomeDiscovery />
      <Footer />
    </main>
  )
}

export default Home

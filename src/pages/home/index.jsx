import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import Hero from '../../components/LandingPage/Hero'
import FAQSection from '../../components/LandingPage/FAQSection'
import HowItWorks from '../../components/LandingPage/HowItWorks'
import Footer from '../../components/LandingPage/Footer'
import PricingSection from '../../components/LandingPage/PricingSection'
import StoryForm from '../../components/TestStoryy'

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <StoryForm /> */}
      <HowItWorks />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

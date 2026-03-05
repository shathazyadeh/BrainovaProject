import { Container } from "@mui/material"
import Hero from "../../components/hero/Hero"
import CoreFeature from "../../components/coreFeatures/CoreFeatures"
import AIinMedicine from "../../components/aIinMedicine/aIinMedicine"

function Home() {
  return (
    <>
      <Hero />

      <Container maxWidth='lg'>
        <CoreFeature />
        <AIinMedicine />

      </Container>
    </>
  )
}

export default Home


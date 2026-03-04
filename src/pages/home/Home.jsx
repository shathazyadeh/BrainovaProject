import { Container } from "@mui/material"
import Hero from "../../components/hero/Hero"
import CoreFeature from "../../components/coreFeatures/CoreFeatures"

function Home() {
  return (
    <>
      <Hero />

      <Container maxWidth='xl'>
        <CoreFeature />

      </Container>
    </>
  )
}

export default Home


import Navbar from "@widgets/Navbar"
import Main from "@widgets/Main"
import FileControlSection from "@widgets/FileControlSection"

const Home = () => {
  return (
    <>
      <Navbar />
      <Main>
        <h1 class="fs-title fw-bold text-center">Image converter</h1>
        <p class="text-center">Convert and optimize images</p>
        <FileControlSection />
      </Main>
    </>
  )
}

export default Home

import Navbar from "@widgets/Navbar"
import Main from "@widgets/Main"
import FileControlSection from "@widgets/FileControlSection"

const Home = () => {
  return (
    <>
      <Navbar />
      <Main>
        <h1 className="fs-title fw-bold text-center">Image converter</h1>
        <p className="text-center">Convert and optimize images</p>
        <FileControlSection />
      </Main>
    </>
  )
}

export default Home

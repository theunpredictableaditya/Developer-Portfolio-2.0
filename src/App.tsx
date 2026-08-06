// import CursorBlob from "./components/Blob/CursorBlob"
import Hero from "./components/Hero/Hero"
import NavBar from "./components/NavBar/NavBar"
import {NavProvider} from "./components/NavBar/nav.context.tsx"

const App = () => {
  return (
    <>
      <NavProvider>
        <NavBar />
      </NavProvider>
      <Hero />
      {/* Experimental Only */}
      {/* <CursorBlob />   */}
    </>
  )
}

export default App
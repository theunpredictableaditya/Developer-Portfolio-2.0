import Signature from "./components/Signature"
import "./Hero.scss"
import schedule from '../../assets/schedule.svg'
import devImage from '../../assets/aditya.png'

const Hero = () => {
  return (
    <section id="hero">
        {/* <div id="preSignature">
          <Signature width={"100%"}/>
        </div> */}
        <div id="actual-hero">
          <div className="left">
            <div className="intro">
              <h1 className="black">IT'S ME</h1>
              <h1 className="blue">ADITYA GUPTA</h1>
            </div>

            <div className="description">
              A passionate UI/UX and Web Designer. I create clean, <br/> user-friendly designs that helps buisnesses connect <br /> with their audience. Let's build something great <br />together!
            </div>

            <div className="completions">
              <div className="projects-done">
                <h3 className="numbers">
                  10+ 
                </h3>
                <span>
                  Projects Done
                </span>
              </div>
            </div>
          </div>

          <div className="right">
            <img src={devImage} alt="" className="devs-image" />
            <button className="schedule-button">
              <img src={schedule} alt="schedule-icon" />
              <span>
                Schedule a Call
              </span>
              </button>
          </div>
        </div>
    </section>
  )
}

export default Hero
import { useState, useRef, useEffect } from "react";
import Signature from "./components/Signature";
import "./Hero.scss";
import schedule from "../../assets/schedule.svg";
import devImage from "../../assets/aditya.png";
import currentProjectImage from "../../assets/this-project.png";

//Import Animation Library
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

const Hero = () => {
  const [showSignature, setShowSignature] = useState<boolean>(true);
  const [showActualHero, setShowActualHero] = useState<boolean>(false);
  const [showActualHeroAnimation, setShowActualHeroAnimation] =
    useState<boolean>(false);

  /**
   * Used useEffect so that the timer only runs at the first mount of
   * the component
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignature(false);
      setShowActualHero(true);
      setShowActualHeroAnimation(true);
    }, 2750);

    return () => clearTimeout(timer);
  }, []);

  // Animation Using Gsap
  // Collectiion Of All Animated Components
  const devImageRef = useRef(null);
  const scheduleButtonRef = useRef(null);
  const currentProjectImageRef = useRef(null);

  useGSAP(() => {
    //Split text elements
    const itsMeText = new SplitText(".black", { type: "chars, words" });
    const devNameText = new SplitText(".blue", { type: "chars, words" });
    const paragraphSplit = new SplitText(".description", { type: "lines" });
    const completionText = new SplitText(".completions-title", {
      type: "chars, words",
    });
    const completionNumbers = new SplitText(".numbers", {
      type: "chars, words",
    });

    // Create timeline
    const tl = gsap.timeline();
    const textTimeline = gsap.timeline({
      defaults: {
        opacity: 0,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.06,
      },
    });

    // Chaining Animations
    if (showActualHeroAnimation && devImageRef.current) {
      // Animating Text Animation
      textTimeline
        .from(itsMeText.chars, { duration: 0.75,})
        .from(devNameText.chars,{ duration: 0.75, }, "-=0.70",)
        .from(paragraphSplit.lines,{ duration: 1.8, }, "-=0.70",)
        .from(completionNumbers.chars,{ duration: 0.5, }, "-=1.1",)
        .from(completionText.chars,{ duration: 0.5, }, "-=0.70");

      tl.from(devImageRef.current, {
        xPercent: 100,
        duration: 1.5,
        ease: "power1.inOut",
      })
        .from(currentProjectImageRef.current, {
          opacity: 0,
          duration: 0.5,
        })
        .from(
          scheduleButtonRef.current,
          {
            yPercent: 100,
            opacity: 0,
            ease: "power1.out",
            duration: 1,
          },
          "-=1",
        );
    }
  }, [showActualHeroAnimation]);

  return (
    <section id="hero">
      {showSignature && (
        <div id="preSignature">
          <Signature width={"100%"} />
        </div>
      )}

      {showActualHero && (
        <div id="actual-hero">
          <div className="left">
            <div className="intro">
              <h1 className="black">IT'S ME</h1>
              <h1 className="blue">ADITYA GUPTA</h1>
            </div>

            <div className="description">
              A passionate UI/UX and Web Designer. I create clean, user-friendly
              designs that helps buisnesses connect with their audience. Let's
              build something great together!
            </div>

            <div className="completions">
              <div className="projects-done">
                <h3 className="numbers">10+</h3>
                <span className="completions-title">Projects Done</span>
              </div>
            </div>
          </div>

          <div className="right">
            <img
              src={currentProjectImage}
              alt="current-project-image"
              className="only-vertical-visible"
              ref={currentProjectImageRef}
            />
            <img
              src={devImage}
              alt=""
              className="devs-image"
              ref={devImageRef}
            />
            <button className="schedule-button" ref={scheduleButtonRef}>
              <img src={schedule} alt="schedule-icon" />
              <span>Schedule a Call</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

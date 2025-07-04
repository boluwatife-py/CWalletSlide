import React, { useEffect, useRef, useState } from "react";
import Spotlight from "../components/UI/SpotLight";
import Logo from "../assets/icons/logo.svg";
import CWallet from "../assets/icons/cwallet.svg";
import SplitText from "../components/UI/SplitText";
import { gsap } from "gsap";
import speakers, { type Speaker } from "../data/Speakers";
import { useNavigate } from "react-router-dom";
import Twitter from "../assets/icons/brand/X.svg";

const SpeakerProfile: React.FC = () => {
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const introTimeline = gsap.timeline();
  const navigate = useNavigate();
  useEffect(() => {
    const storedId = localStorage.getItem("selectedSpeakerId");
    const selected = speakers.find((s) => s.id === storedId);
    if (!selected) {
      // Delay redirect slightly to ensure all hooks run first
      setTimeout(() => navigate("/select", { replace: true }), 0);
    } else {
      setSpeaker(selected);
    }
  }, [navigate]);

  const firstTextWordCount = speaker?.bio1.split(" ").length || 0;
  const firstDuration = 1 + (50 / 1000) * firstTextWordCount;

  useEffect(() => {
    if (speaker && secondTextRef.current) {
      gsap.set(secondTextRef.current, { opacity: 0 });
      introTimeline.to(
        secondTextRef.current,
        { opacity: 1, duration: 0 },
        firstDuration
      );
    }
  }, [speaker, firstDuration]);

  // ❌ Avoid early return — just hide UI safely
  if (!speaker)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg.jpeg')", backgroundPositionY: 0 }}
      />

      <Spotlight
        effects={[
          {
            width: 300,
            height: 300,
            fade: 72,
            speed: 0.87,
            initialPosition: { x: 412, y: 305 },
            initialVelocity: { vx: -1.2, vy: 2.3 },
            revealPercentage: 56,
          },
          {
            width: 300,
            height: 300,
            fade: 34,
            speed: 0.49,
            initialPosition: { x: 85, y: 742 },
            initialVelocity: { vx: 2.1, vy: -0.8 },
            revealPercentage: 88,
          },
          {
            width: 300,
            height: 300,
            fade: 98,
            speed: 0.76,
            initialPosition: { x: 730, y: 430 },
            initialVelocity: { vx: -2.5, vy: 1.1 },
            revealPercentage: 67,
          },
          {
            width: 300,
            height: 300,
            fade: 45,
            speed: 0.65,
            initialPosition: { x: 215, y: 390 },
            initialVelocity: { vx: 1.4, vy: -2.6 },
            revealPercentage: 74,
          },
          {
            width: 300,
            height: 300,
            fade: 29,
            speed: 0.38,
            initialPosition: { x: 640, y: 180 },
            initialVelocity: { vx: 0.7, vy: 2.9 },
            revealPercentage: 91,
          },
        ]}
      />

      <div className="relative z-30 h-full">
        <div className="fixed top-[1vw] right-[1vw]">
          <div className="flex items-center justify-center gap-[.4vw]">
            <img src={Logo} alt="Logo" className="w-[2.5vw]" />
            <img src={CWallet} alt="CWallet" className="w-[8vw]" />
          </div>
        </div>

        <div className="flex h-full items-center gap-[.4vw] pt-[5vw]">
          <div className="w-[34.6vw] h-full flex justify-center items-start flex-col">
            <div className="px-[1vw] w-full">
              <div className="jump-in ">
                <div className="border-l-[.9vw] border-green-700 rounded-full tilt w-full aspect-square">
                  <div className="w-full h-full rounded-full overflow-hidden un-tilt animated-glow">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top breathing-effect"
                    />
                  </div>
                </div>
              </div>
            </div>
            {speaker.twitter && (
              <h1 className="translate-y-[1vw] flex items-center justify-center gap-[.4vw] w-full text-[1vw]">
                <img src={Twitter} alt="" className="w-[1.2vw]" />
                {speaker.twitter}
              </h1>
            )}
          </div>

          <div className="w-[65vw] h-full py-[2vw] px-[2vw] flex justify-center items-center overflow-auto no-scrollbar">
            <div className="text-center font-bold text-[2vw]">
              <SplitText
                className="text-shadow-md text-shadow-green-500"
                splitType="words"
                ease="elastic.out(1, 0.9)"
                duration={1}
                delay={50}
                textAlign="left"
                timeline={introTimeline}
                text={speaker.bio1}
              />
              <div ref={secondTextRef}>
                <SplitText
                  className="mt-[1vw] text-shadow-md text-shadow-green-500"
                  splitType="words"
                  ease="elastic.out(1, 0.9)"
                  duration={1}
                  delay={50}
                  textAlign="left"
                  timeline={introTimeline}
                  startAt={firstDuration}
                  text={speaker.bio2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerProfile;

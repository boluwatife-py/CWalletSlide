import React, { useEffect, useState } from "react";
import Spotlight from "../components/UI/SpotLight";
import Logo from "../assets/icons/logo.svg";
import CWallet from "../assets/icons/cwallet.svg";
import ShinyText from "../components/UI/ShinyText";

const programSteps = [
  "Guest Arrival & Registration",
  "Opening Prayer",
  "Welcome Icebreaker",
  "Event Overview: Purpose & Vision",
  "Keynote Session 1",
  "Keynote Session 2",
  "Networking Session I",
  "Interactive Segment",
  "Cwallet Onboarding Workshop",
  "Keynote Session 3",
  "Keynote Session 4",
  "Q&A Session",
  "Networking Session II",
  "Neurobro Onboarding Session",
  "Panel Discussion: Navigating Forex into Web3",
  "Vote of Thanks",
  "Refreshments & Socializing",
  "Closing Prayer",
  "Group Photo Session",
];

const OrderOfProgram: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState<string | null>(null);

  useEffect(() => {
    const step = localStorage.getItem("selectedProgramStep");

    if (step) setActiveProgram(step);
  }, []);

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

        <div className="mt-[3vw]">
          <span className="text-[2vw] w-full block text-center">Order of Program</span>
          <div className="flex h-full items-center gap-[1vw] pt-[5vw] px-[5vw]">
            {[0, 1].map((col) => (
              <ul
                key={col}
                className="w-1/2 list-none font-bold text-[2.5vw] text-center flex flex-col items-center justify-start"
              >
                <div>
                  {programSteps
                    .slice(
                      col * Math.ceil(programSteps.length / 2),
                      (col + 1) * Math.ceil(programSteps.length / 2)
                    )
                    .map((step) => (
                      <li key={step} className="text-start">
                        {step === activeProgram ? (
                          <ShinyText
                            text={"·· " + step}
                            className="text-[2.5vw]"
                            speed={2}
                          />
                        ) : (
                          "· " + step
                        )}
                      </li>
                    ))}
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOfProgram;

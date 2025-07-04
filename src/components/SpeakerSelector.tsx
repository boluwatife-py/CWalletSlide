import React, { useState } from "react";
import speakers from "../data/Speakers";

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

const SpeakerSelector: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string>("Guest Arrival & Registration");

  const handleSpeakerSelect = (speakerId: string) => {
    localStorage.setItem("selectedSpeakerId", speakerId);
    window.location.href = "/";
  };

  const handleStepSelect = () => {
    if (!selectedStep) return alert("Please select a step.");
    localStorage.setItem("selectedProgramStep", selectedStep);
    window.location.href = "/order";
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Select a Speaker or a Program Step
      </h1>


      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Speakers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="cursor-pointer p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
              onClick={() => handleSpeakerSelect(speaker.id)}
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-40 h-40 rounded-full object-cover mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">{speaker.name}</h2>
              <p className="text-center text-sm text-green-400">{speaker.alias}</p>
              <p className="text-center text-xs text-zinc-400 mt-1">Click to assign & go to home</p>
            </div>
          ))}
        </div>
      </section>


      <section className="w-full max-w-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">Program Order</h2>
        <select
          className="w-full p-3 rounded-lg mb-4 border"
          value={selectedStep}
          onChange={(e) => setSelectedStep(e.target.value)}
        >
          <option value="" disabled>Select a step...</option>
          {programSteps.map((step) => (
            <option key={step} value={step} className="text-black">{step}</option>
          ))}
        </select>
        <button
          onClick={handleStepSelect}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-lg font-semibold"
        >
          Confirm Step & Go to /order
        </button>
      </section>
    </div>
  );
};

export default SpeakerSelector;

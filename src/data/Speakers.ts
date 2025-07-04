import John from "../assets/Speakers/JohnOluwadamilare.png";
import Basit from "../assets/Speakers/Basit.png";
import Ade from "../assets/Speakers/ade.png"

export type Speaker = {
  id: string;
  name: string;
  alias: string;
  bio1: string;
  bio2: string;
  image: string;
  twitter?: string;
};

const speakers: Speaker[] = [
  {
    id: "gojo",
    name: "Oluwadare John",
    alias: "Gojo Enigma",
    image: John,
    bio1: "Oluwadare John, known across CrossFi as Gojo Enigma, is the founder of The Agentic Arc a startup dedicated to crafting high-impact educational content around decentralized AI agents. He’s also the head of Video Marketing at Neurobro, where he leads creative strategy for top-tier CrossFi narratives.",
    bio2: "Renowned for his engaging video work within the Virtuals ecosystem, Gojo has helped onboard hundreds of CrossFi natives by simplifying complex topics with storytelling and visual clarity. His mission is simple yet bold to demystify CrossFi, DeAI, and agents in a way that brings the next million people onchain.",
    twitter: "gojo_enigma",
  },
  {
    id: "basit",
    name: "Basit",
    alias: "Basit",
    image: Basit,
    bio1: "Basit is an aspiring Web3 data scientist and writer focused on simplifying complex ideas. With a background rooted in community, product, and user research, he’s passionate about helping teams uncover friction in their UX flows and give better insights about their products.",
    bio2: "He has contributed to ecosystem like MegaETH, and currently spends time exploring crypto culture, user behavior, and blockchain data He believes the future of Web3 depends on data, clear communication, accessible products, and communities that actually care.",
    twitter: "basit",
  },
  {
    id: "adecrypt",
    name: "Ade CryptA",
    alias: "Ade CryptA",
    image: Ade,
    bio1: "Ade CryptA is a seasoned KOL (Key Opinion Leader), crypto trader, Web3 ambassador, and social media manager. With a strong passion for blockchain innovation. He creates engaging content, builds vibrant communities, and helps Web3 projects gain visibility and traction in the digital space.",
    bio2: "Ade is known for bridging the gap between crypto projects and their audiences driving real growth through strategy, creativity, and authentic influence.",
    twitter: "ade_cryptA",
  },
];

export default speakers;

import React from "react";
import SectionHeading from "./SectionHeading";

const images = require.context("../../images", false, /\.(png|jpe?g|svg)$/);
const cardData = [
  {
    id: 1,
    imgSrc: "search-black.svg",
    altText: "search",
    title: "Search Destination",
    description: "Search and select a destination that you are traveling to.",
  },
  {
    id: 2,
    imgSrc: "partner.svg",
    altText: "partner",
    title: "Find Travel Partners",
    description:
      "Browse through the list of trips, locals, and nearby users in that location.",
  },
  {
    id: 3,
    imgSrc: "smile.svg",
    altText: "smile",
    title: "Get Connected",
    description:
      "Chat with your travel partners to coordinate trip details and stay organized.",
  },
  {
    id: 4,
    imgSrc: "group.svg",
    altText: "group",
    title: "Trip Together",
    description:
      "Plan together, meet up with your travel companion at a pre-decided public place and travel together.",
  },
  {
    id: 5,
    imgSrc: "airplane.svg",
    altText: "airplane",
    title: "Enjoy the Journey",
    description:
      "Embark on your adventure with trusted travel buddies and make unforgettable memories.",
  },
  {
    id: 6,
    imgSrc: "star.svg",
    altText: "star",
    title: "Share Reviews",
    description:
      "Rate your travel partners and share feedback to help future travelers.",
  },
];

function HowMain() {
  return (
    <section id="main-how" className="vh-70 position">
      <div className="sec flex justify-content items-center text-center vh-70 pad">
        <SectionHeading
          secHead="How it works?"
          secSubHead="From Start to Finish"
        />
        <div className="container flex justify-content items-center grid-4">
          <Cards cardData={cardData} />
        </div>
      </div>
    </section>
  );
}

export default HowMain;

function Cards({ cardData }) {
  return (
    <>
      {cardData.map((card) => (
        <div className="card w-100" key={card.id}>
          <img className="mx-auto" src={images(`./${card.imgSrc}`)} alt={card.altText} />
          <h3 className="fw-500">{card.title}</h3>
          <p className="para-c para-f">{card.description}</p>
        </div>
      ))}
    </>
  );
}

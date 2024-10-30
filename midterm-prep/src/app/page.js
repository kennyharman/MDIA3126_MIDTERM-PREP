"use client"
import { useState } from "react";
import Image from "next/image";

export default function Home() {

// - Implementation
// - Pick an API to use
// - Build a button that has a fetch action
// - Build a component for displaying our data (should have empty or fulfilled state)
// - Build a function that does some data fetching
// - Format and handle data
// - Style and create breakpoints
// - Component for our button

  const [pictureContents, setPictureContents] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchPictures() {
    const API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5";
    const response = await fetch (API_URL);
    const data = await response.json();
    setPictureContents(data);
    //setPictureContents("fake data");
    setLoading(false);
  }

  const Header = () => {
    return (
      <header>
        <h1>
          My absolutely huge bungus midterm preparatory website
        </h1>
        <button 
          className="border-2 border-white p-2"
          onClick={fetchPictures}
          disabled={loading}
        >
          Fetch
        </button>
      </header>
    );
  };

  const PictureDisplay = () => {
    if (loading) {
      return <section>
        Loading...
      </section>
    }

    if (pictureContents) {
      const pictureList = [];

      pictureContents.forEach((picture, i) => {
        pictureList.push(
          <article key = {i}>
            <img src={picture.url} alt={picture.explanation}/>
            <h2>
              {picture.title}
            </h2>
            <p>
              {picture.explanation}
            </p>
          </article>)
      })
      return <section>
        {pictureList}
      </section>
    }

    return <section>
      There have been, infact, no photos fetched
    </section>

  }

  return (
    <div className='m-8'>
      <Header/>
      <PictureDisplay/>
    </div>
  );
}

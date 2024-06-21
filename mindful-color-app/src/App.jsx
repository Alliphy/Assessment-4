import "./App.css";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { useEffect, useState } from "react";

export default function App() {
  const [paletteColors, setPaletteColors] = useState([]);

  useEffect(() => {
    fetch("/api/random-palette")
      .then((response) => response.json())
      .then((data) => {
        setPaletteColors(data.colors);
      });
  }, []);

  useEffect(() => {
    console.log("paletteColors: ", paletteColors);
  }, [paletteColors]);

  return (
    <>
      <header>
        <section id="header-section">
          <img
            id="logo-img"
            src="../logo-mindful-color.png"
            alt="mindful-colors-logo"
          />
        </section>
      </header>

      <main>
        <article>
          <button type="submit">Click to regenerate color palette</button>
        </article>{" "}
        <section className="App-Glider-Container">
          <h3>Palette</h3>

          {paletteColors &&
            paletteColors.length > 0 &&
            paletteColors.map((color) => (
              <div
                key={color}
                style={{
                  backgroundColor: `#${color}`,
                  width: "50px",
                  height: "50px",
                }}
              ></div>
            ))}

          <Glider
            draggable
            hasArrows
            hasDots
            slidesToShow={5}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 768,
                settings: { slidesToShow: 5 },
              },
            ]}
          ></Glider>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

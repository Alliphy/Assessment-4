import "./App.css";
import * as React from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import fetchColors from "./server";

export default function App() {
  let paletteColors;

  fetchColors();

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
        <div>
          {paletteColors &&
            paletteColors.length > 0 &&
            paletteColors.map((color) => {
              <div
                style={{
                  backgroundColor: color,
                  width: "50px",
                  height: "50px",
                }}
              ></div>;
            })}
        </div>
        <article>
          <h1>Click submit to generate a Palette</h1>
          <button type="submit">submit</button>
        </article>{" "}
        <section className="App-Glider-Container">
          <h3>Palette</h3>
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
          >
            <article className="App-Card-Wrapper">
              <div className="App-Card-Body">
                <h4>lorem ipsum.</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </p>
              </div>
              <button className="App-Icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button className="App-Icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </article>
          </Glider>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

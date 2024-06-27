import "./App.css";
import { useCallback, useEffect, useState } from "react";
import PaletteGenerator from "./components/PaletteGenerator.jsx";
import { Palette } from "./components/Palette.jsx";
import styled from "styled-components";
import "@rc-component/color-picker/assets/index.css";

export default function App() {
  const [palette, setPalette] = useState([]);
  const [myUserPalettes, setMyUserPalettes] = useState([]);

  const generateNewPalette = () => {
    // Function to generate a new palette
    const newPalette = [];
    for (let i = 0; i < 5; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      newPalette.push(randomColor);
    }
    setPalette(newPalette);
  };

  const handleSavePalette = async () => {
    if (palette.length === 0) {
      return; // Exit function early if no palette exists
    }

    try {
      const newPalette = {
        colors: palette,
        name: "User Submitted Palette",
      };

      const response = await fetch("/api/save-palette", {
        method: "POST", // Use POST for sending data
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ palette: newPalette }),
      });

      if (!response.ok) {
        throw new Error(`Error saving palette: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("palette data after create: ", data);

      onPaletteCreated(data);
      setPalette([]);
    } catch (error) {
      console.error("Error saving palette:", error);
      alert("There was an error saving the palette. Please try again later.");
    }
  };

  const fetchMyPalettes = useCallback(() => {
    fetch("/api/palettes/me")
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        if (Array.isArray(data)) {
          setMyUserPalettes(data);
        }
      })
      .catch((e) => {
        console.log("does it make it here? ");
        console.error(e);
      });
  }, []);

  // TODO: might not need this
  const onPaletteCreated = (data) => {
    console.log("palette created");
    console.log("here is the data: ", data);
    fetchMyPalettes();
  };

  // TODO: might not need this
  const onDeleted = (id) => {
    console.log("palette deleted");
    console.log(id);
    fetchMyPalettes();
  };

  useEffect(() => {
    fetchMyPalettes();
  }, [fetchMyPalettes]);

  return (
    <Container>
      <header>
        <section id="header-section">
          <img
            id="logo-img"
            src="../logo-mindful-color.png"
            alt="mindful-colors-logo"
          />
          <ButtonSection>
            <GenerateButton onClick={generateNewPalette}>
              Generate New Palette
            </GenerateButton>
            <GenerateButton onClick={handleSavePalette}>
              Save Palette
            </GenerateButton>
          </ButtonSection>
        </section>
      </header>

      <main>
        <PaletteGenerator
          palette={palette}
          setPalette={setPalette}
          onPaletteCreated={onPaletteCreated}
          type="submit"
        ></PaletteGenerator>
        <div className="my-palettes">
          {myUserPalettes.length === 0 && (
            <div>
              <h2>No User Palettes Saved.</h2>
              <p>
                Click Generate Palette, modify as you please, and Save Palette
                when completed
              </p>
            </div>
          )}
          {myUserPalettes.map((pal, i) => (
            <Palette key={i} palette={pal} onDeleted={onDeleted} />
          ))}
        </div>
      </main>
      <footer></footer>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
`;

const ButtonSection = styled.section`
  display: flex;
  margin: 2rem 3rem;
  justify-content: space-between;
`;

const GenerateButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  height: 4rem;

  &:hover {
    background-color: #45a049; /* Green with a darker shade on hover */
  }
`;

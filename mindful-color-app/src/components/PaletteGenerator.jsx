import { useState } from "react";
import styled from "styled-components";

export default function PaletteGenerator(props) {
  // eslint-disable-next-line react/prop-types
  const { onPaletteCreated } = props;

  const [palette, setPalette] = useState([]);

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
      alert("Please generate a palette before saving.");
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

      onPaletteCreated(data);

      alert(
        `Palette saved successfully! (Server response: ${data.message || ""})`
      );
    } catch (error) {
      console.error("Error saving palette:", error);
      alert("There was an error saving the palette. Please try again later.");
    }
  };

  return (
    <>
      <div>
        {palette.map((color) => (
          <div
            key={color}
            style={{
              backgroundColor: color,
              width: "100px",
              height: "100px",
              margin: "10px",
            }}
          ></div>
        ))}
        <GenerateButton onClick={generateNewPalette}>
          Generate New Palette
        </GenerateButton>
        <button onClick={handleSavePalette}>Save Palette</button>
      </div>
      <div></div>
    </>
  );
}

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

  &:hover {
    background-color: #45a049; /* Green with a darker shade on hover */
  }
`;

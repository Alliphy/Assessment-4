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

      console.log("palette data after create: ", data);

      onPaletteCreated(data);

      alert(
        `Palette saved successfully! (Server response: ${data.message || ""})`
      );
    } catch (error) {
      console.error("Error saving palette:", error);
      alert("There was an error saving the palette. Please try again later.");
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function colorInput(props) {
    async (palette) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      const { onPaletteCreated } = props;

      try {
        const response = await fetch("/api/palettes/p:id", {
          method: "POST",
          body: JSON.stringify({ palette }),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Palette created successfully:", data);
        setIsSubmitting(false); // Reset submission state
        onPaletteCreated(data);
      } catch (error) {
        console.error("Error creating palette:", error);
        setErrorMessage(error.message); // Display error message
      }
    };
  }

  //   return (
  //     <div>
  //       <button onClick={generateNewPalette}>Generate New Palette</button>
  //       {palette.length > 0 && (
  //         <ul>
  //           {palette.map((colorObj, index) => (
  //             <li key={index} style={{ backgroundColor: colorObj.color }}>
  //               <input
  //                 type="text"
  //                 readOnly
  //                 value={colorObj.hexValue}
  //                 placeholder={`#${colorObj.hexValue}`} // Improved placeholder
  //               />
  //               <span>{colorObj.color}</span> {/* Display actual color value */}
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <>
      <section>
        <GenerateButton onClick={generateNewPalette}>
          Generate New Palette
        </GenerateButton>
        <GenerateButton onClick={handleSavePalette}>
          Save Palette
        </GenerateButton>
      </section>
      <GeneratedPalette className="generated-palette-div">
        {/* {palette.map((color) => ( */}
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
        <ul>
          {palette.map((colorObj, index) => (
            <div
              key={colorObj}
              style={{
                backgroundColor: `#${index}`,
                width: "100px",
                height: "100px",
                margin: "10px",
                display: "flex",
              }}
            >
              {" "}
              <li key={index} style={{}}>
                <input
                  type="text"
                  value={colorObj.hexValue}
                  placeholder={`#${colorObj.hexValue}`} // Improved placeholder
                />
                <span>{colorObj.color}</span> {/* Display actual color value */}
              </li>
            </div>
          ))}
        </ul>
      </GeneratedPalette>
    </>
  );
}

const GeneratedPalette = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
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

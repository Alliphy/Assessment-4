import "./App.css";
import { useCallback, useEffect, useState } from "react";
import PaletteGenerator from "./components/PaletteGenerator.jsx";
import { Palette } from "./components/Palette.jsx";
import ColorInput from "./components/NameColor.jsx";
// import { Picker } from "./components/ColorPicker.jsx";

// import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";

export default function App() {
  // const [paletteColors, setPaletteColors] = useState([]);
  const [myUserPalettes, setMyUserPalettes] = useState([]);

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
  };

  // TODO: might not need this
  const onDeleted = (id) => {
    console.log("palette deleted");
    console.log(id);
  };

  useEffect(() => {
    fetchMyPalettes();
  }, [fetchMyPalettes]);

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
        {/* <ColorPicker
          onChangeComplete={(color) => {
            setPaletteColors((prev) => [...prev, color]);
          }}
        /> */}

        <PaletteGenerator
          onPaletteCreated={onPaletteCreated}
          type="submit"
        ></PaletteGenerator>
        <ColorInput></ColorInput>
        <div className="my-palettes">
          {myUserPalettes.map((pal, i) => (
            <Palette key={i} palette={pal} onDeleted={onDeleted} />
          ))}
        </div>
      </main>
      <footer></footer>
    </>
  );
}

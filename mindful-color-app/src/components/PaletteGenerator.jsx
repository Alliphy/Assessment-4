import { useState } from "react";
import styled from "styled-components";
import ColorPicker, { Color } from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";

export default function PaletteGenerator(props) {
  // eslint-disable-next-line react/prop-types
  const { onPaletteCreated } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { palette, setPalette } = props;
  const [pickerColor, setPickerColor] = useState("");
  const [showPickerIndex, setShowPickerIndex] = useState(-1);

  const onColorChange = (newColor, index) => {
    console.log(newColor, index);
    setPalette((prevPal) => {
      prevPal.splice(index, 1, newColor);
      return [...prevPal];
    });
  };

  const openPicker = (color, index) => {
    setPickerColor(color);
    setShowPickerIndex(index);
  };

  return (
    <GeneratedPalette className="generated-palette-div">
      {/* {palette.map((color) => ( */}
      {palette.map((color, index) => (
        <>
          <ColorBox
            key={index}
            style={{
              backgroundColor: color,
            }}
            onClick={() => openPicker(color, index)}
          ></ColorBox>

          {pickerColor && index === showPickerIndex && (
            <ColorPicker
              style={{ position: "absolute", zIndex: "10000", top: "130px" }}
              defaultValue={pickerColor}
              onChangeComplete={(val) =>
                onColorChange(val.toHexString(), index)
              }
            />
          )}
        </>
      ))}
    </GeneratedPalette>
  );
}

const GeneratedPalette = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 50px;
`;

const ColorBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  outline: 1px solid ivory;
  position: relative;
`;

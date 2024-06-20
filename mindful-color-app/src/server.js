import rgbHex from "rgb-hex";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";

const app = express();
const port = "8000";
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

const convertRGBtoHex = async (color) => {
  return rgbHex(color.toString());
};

const fetchColors = async () => {
  const url = "http://colormind.io/api/";
  const request = {
    model: "ui",
    input: ["N", "N", "N"],
  };

  try {
    const response = await axios.post(url, JSON.stringify(request));

    const paletteColors = response.data.result.map((color) => {
      console.log("color: ", color);
      // convert the color to a HEX value.
      const hexValue = convertRGBtoHex(color);
      console.log(hexValue);
      return hexValue;
    });
    console.log("paletteColors: ", paletteColors);
  } catch (error) {
    console.error("Error fetching colors:", error);
  }
};

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);

export default fetchColors;

import express from "express";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import ViteExpress from "vite-express";
import { sql } from "./db.js";

const app = express();
const port = "5173";
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

app.use(cors());

app.get("/api/palettes/me", async (req, res) => {
  console.log("does it get here? ");
  let result;
  try {
    result = await sql`
    SELECT * FROM user_palettes;
  `;
    console.log("RESULT", result);
    res.send(result);
  } catch (e) {
    console.error("ERROR", e);
    return res.status(500).send(e);
  }
});

//SAVE PAlETTE

app.post("/api/save-palette", async (req, res) => {
  const { palette } = req.body; // Destructure palette data from request body

  console.log("palette being saved: ", palette);

  const newPalette = {
    name: palette.name,
    colors: palette.colors.map((color) => color.replace("#", "")),
  };

  try {
    console.log("Received palette:", palette); // Log the received palette
    const colors = sql.array(newPalette.colors);
    await sql`
    
      INSERT INTO user_palettes (
        name,
        colors
      ) VALUES (
        ${newPalette.name},
        ${colors}
      );

    `;

    res.status(200).json({ message: "Palette saved successfully!" }); // Send success response

    console.log("request is done");
  } catch (error) {
    console.error("Error saving palette:", error);
    res.status(500).json({ message: "Error saving palette.", error }); // Send error response
  }
});

app.delete("/api/palettes/:id", async (req, res) => {
  const id = req.params.id;

  console.log("id: ", id);
  try {
    const result = await sql`

    DELETE FROM user_palettes
    WHERE id = ${id};

  `;
    res.json(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);

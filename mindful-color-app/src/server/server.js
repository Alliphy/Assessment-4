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
  // const palettes = await db.fetchUserPalettes(req.user.id)
  // return palettes;
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

app.post("/api/palettes/me", async (req, res) => {
  // const result = await db.createUserPalette(newPalette)
  // return result;
});

app.put("/api/palettes/:pId", async (req, res) => {
  // const userId = req.user.id;
  // const pId = req.params.pId;
  // const result = await db.updateUserPalette(userId, pId, {
  //   name: req.body.name,
  //   colors: req.body.colors,
  // });
  // return result;
});

app.delete("/api/palettes/:id", async (req, res) => {
  // console.log("request: ", req);
  // console.log("response: ", res);
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

/**
 * Per user:
 *   - Get saved Pals
 *   - Create saved Pals
 *   - Delete saved Pals
 *   - Update saved Pals - 
 * 
 * What are User Pals?
 *  - Array of colors length 5
 *  - colors are string hexadecimals 
 * 
const myUserPalette = {
  userId: '1232938472938472',
  colors: ['234234', '2342342', '2342342'],
  name: 'Default Palette'
}
 */

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);

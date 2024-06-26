import { useState, useEffect } from "react";

export default function ColorInput({ color, maxNames = 5, onSubmit }) {
  const [value, setValue] = useState(color ? `#${color}` : "");
  const [namedColors, setNamedColors] = useState([]);

  useEffect(() => {
    setValue(color ? `#${color}` : "");
    // Load named colors from storage or API on component mount (optional)
    // setNamedColors(loadNamedColors());
  }, [color]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = value.slice(1); // Remove leading "#"

    if (namedColors.length < maxNames) {
      setNamedColors([...namedColors, name]);
      onSubmit(name, color); // Pass both name and color
    } else {
      console.error("Maximum number of named colors reached");
      // Handle reaching the limit (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Name Color</button>
      {namedColors.length > 0 && (
        <ul>
          {namedColors.map((namedColor) => (
            <li key={namedColor}>{namedColor}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

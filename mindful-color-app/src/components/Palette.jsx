import styled from "styled-components";

export const Palette = ({ palette, onDeleted }) => {
  const deletePalette = () => {
    fetch(`/api/palettes/${palette.id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleted(palette.id);
    });
  };

  return (
    <Container>
      <Name>{palette.name}</Name>
      <ColorPalette>
        {palette.colors.map((color, i) => (
          <Color
            key={i}
            className="color"
            style={{ backgroundColor: `#${color}` }}
          ></Color>
        ))}
      </ColorPalette>
      <button onClick={() => deletePalette()}>X</button>
    </Container>
  );
};

const Name = styled.p`
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 2rem;
`;

const ColorPalette = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const Color = styled.div`
  width: 100px;
  height: 100px;
`;

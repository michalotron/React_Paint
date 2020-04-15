import React, { useState } from 'react';
import './App.css';
import { ChromePicker } from 'react-color';


function App() {
  const [canvas, setCanvas] = useState(
    new Array(47).fill('')
      .map(() => new Array(50).fill('')))

  const [filledPixels, setFilledPixels] = useState([])

  const [color, setColor] = useState('#000000');

  const handlePixelClick = (rowIndex, pixelIndex) => {
    const isThereNot = (pair) => !(pair[0] === rowIndex && pair[1] === pixelIndex)
    setFilledPixels([...filledPixels.filter(isThereNot), [rowIndex, pixelIndex, color]])
  }

  const handleRightClick = (event, rowIndex, pixelIndex) => {
    event.preventDefault()
    erasePixel(rowIndex, pixelIndex)
  }

  const erasePixel = (rowIndex, pixelIndex) => setFilledPixels(
    filledPixels.filter(([x, y]) => !(x === rowIndex && y === pixelIndex))
  )

  const getColor = (rowIndex, pixelIndex) => {
    const pixel = filledPixels.find(([x, y]) => (x === rowIndex && y === pixelIndex))
    return (pixel)
      ? pixel[2]
      : 'white'
  }

  return (
    <div className={"centered"}>
      <h2 className={"title"}>Prawie jak Paint 🖌</h2>
      <div className={"picker-style"}>
        <ChromePicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
      </div>
      {
        canvas.map((row, rowIndex) => (
          <div key={rowIndex}
            className={'canvas-row'}>
            {
              row.map((pixel, pixelIndex) =>
                <div
                  /* onMouseOver={() => handlePixelClick(rowIndex, pixelIndex)} */
                  key={pixelIndex}
                  onContextMenu={(event) => handleRightClick(event, rowIndex, pixelIndex)}
                  onClick={() => handlePixelClick(rowIndex, pixelIndex)}
                  className={"pixel"}
                  style={{ backgroundColor: getColor(rowIndex, pixelIndex) }}
                />)
            }
          </div>
        ))
      }
    </div>
  );
}

export default App;

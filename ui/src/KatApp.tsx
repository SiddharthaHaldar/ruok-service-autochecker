import React, { useState } from 'react';
import './styles.css';

const fruits = [
  { name: 'Apples', color: 'Red', taste: 'Sweet' },
  { name: 'Strawberries', color: 'Red', taste: 'Sweet' },
  { name: 'Cherries', color: 'Red', taste: 'Sweet' },
  { name: 'Pears', color: 'Green', taste: 'Sweet' },
  { name: 'Grapes', color: 'Green', taste: 'Sweet' },
  { name: 'Blueberries', color: 'Blue', taste: 'Sweet' },
  { name: 'Oranges', color: 'Orange', taste: 'Sweet' },
  { name: 'Lemons', color: 'Yellow', taste: 'Sour' },
];

function App() {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [filteredFruits, setFilteredFruits] = useState<typeof fruits>([]);

  const handleColorButtonClick = (color: string) => {
    setSelectedColor(color);
    const filteredFruits = fruits.filter((fruit) => fruit.color === color);
    setFilteredFruits(filteredFruits);
  };

  return (
    <div>
      <h1>Fruits and Their Characteristics</h1>
      <div className="container">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Fruit</th>
                <th>Color</th>
                <th>Taste</th>
              </tr>
            </thead>
            <tbody>
              {fruits.map((fruit, index) => (
                <tr key={index}>
                  <td>{fruit.name}</td>
                  <td>{fruit.color}</td>
                  <td>{fruit.taste}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttons-container">
          <div className="buttons">
            {['Red', 'Green', 'Blue', 'Orange', 'Yellow'].map((color) => (
              <button
                key={color}
                onClick={() => handleColorButtonClick(color)}
              >
                {color}
              </button>
            ))}
          </div>
          <div className="coloredFruits">
            <h2>Colored Fruits</h2>
            <ul>
              {filteredFruits.map((fruit, index) => (
                <li key={index}>{fruit.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

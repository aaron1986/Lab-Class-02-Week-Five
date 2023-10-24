import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  //To count images when clicked
  const [clickCounts, setClickCounts] = useState(({}));

  //useEffect hook fetches data from an API
  //https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {

    //I used fetch becuase I have used it in the past to pull data from a CSV file
    const apiUrl = 'src/assets/data.json'; 
    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        // set the images counts to zero
        const initialClickCounts = {};
        jsonData.forEach((item) => {
          initialClickCounts[item._id] = 0;
        });
        setClickCounts(initialClickCounts);
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 


  const handleImageClick = (itemId) => {
    setClickCounts((prevClickCounts) => ({
      ...prevClickCounts,
      [itemId]: prevClickCounts[itemId] + 1,
    }));
  };

  return (
    <div>
      <h1>Lab: Class 02</h1>
      <section id="grid">
        <div id="image-grid">
        {data.map((item) => (
          <div key={item._id}>
            <img src={item.image_url} alt={item.title} onClick={() => handleImageClick(item._id)} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Keyword: {item.keyword}</p>
            <p>Horns: {item.horns}</p>
            <p>Clicks: ❤️ {clickCounts[item._id]}</p>
          </div>
        ))}
        </div>
     
      </section>
   
    </div>
  );
}

export default App

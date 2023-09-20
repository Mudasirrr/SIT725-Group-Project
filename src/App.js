// React components in the frontend

import React, { useState } from 'react';
//import QrReader from 'react-qr-reader'; // You might need to install this library
import { QrReader } from 'react-qr-reader';

function App() {
  const [qrResult, setQrResult] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [userAllergies, setUserAllergies] = useState([]);

  // Function to handle barcode scan
  const handleScan = (data) => {
    if (data) {
      setQrResult(data);

      // Fetch product information from your backend API using data (e.g., barcode or product ID)
      fetch(`https://foodallergy/api/product/${data}`)
        .then((response) => response.json())
        .then((productData) => {
          // Display product information to the user
          console.log(productData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Function to handle adding user allergies
  const handleAddAllergy = (allergy) => {
    setUserAllergies([...userAllergies, allergy]);
  };

  // Function to handle removing user allergies
  const handleRemoveAllergy = (allergy) => {
    const updatedAllergies = userAllergies.filter((a) => a !== allergy);
    setUserAllergies(updatedAllergies);
  };

  // Function to submit user allergies to the backend
  const handleSubmitAllergies = () => {
    // Send userAllergies to your backend API for storage and further processing
    fetch('https://foodallergy/api/user/allergies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ allergies: userAllergies }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Food Allergy Scanner</h1>
      <div>
        <h2>Scan a Barcode</h2>
        <QrReader
          delay={300}
          onError={(error) => console.error(error)}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        <p>Scanned Data: {qrResult}</p>
      </div>
      <div>
        <h2>Your Allergies</h2>
        <ul>
          {allergies.map((allergy) => (
            <li key={allergy}>
              {allergy}{' '}
              <button onClick={() => handleAddAllergy(allergy)}>Add</button>
            </li>
          ))}
        </ul>
        <h3>User Allergies</h3>
        <ul>
          {userAllergies.map((allergy) => (
            <li key={allergy}>
              {allergy}{' '}
              <button onClick={() => handleRemoveAllergy(allergy)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmitAllergies}>Submit Allergies</button>
      </div>
    </div>
  );
}

export default App;

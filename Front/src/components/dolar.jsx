import React, { useState, useEffect } from 'react';

const Dolar = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        console.log('Response received:', response);

        if (response.ok) {
          const data = await response.json();
          console.log('Data received:', data);
          setData(data.rates['ARS']); // Get the value of USD to ARS
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-green-500 text-white p-4 rounded-md">
      {error && <div className="text-red-500">Error: {error}</div>}
      {data && <div className="text-lg">Valor del Dólar: {data}</div>}
    </div>
  );
};

export default Dolar;
import React, { useState, useEffect } from "react";

function MyComponent() {
  // State to store fetched data
  const [data, setData] = useState(null);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  // Function to fetch data
  const fetchData = async () => {
    try {
      // Make a GET request using the Fetch API
      const response = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=715dd38b56bede6d0444c207f4eed942"
      );

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON data from the response
      const result = await response.json();

      console.log(JSON.stringify(result));

      // Update the state with the fetched data
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Render the component
  return (
    <div>
      {data ? (
        // Display the fetched data
        <p>{JSON.stringify(data)}</p>
      ) : (
        // Display a loading message or other UI while data is being fetched
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;

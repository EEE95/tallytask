import React, { useState } from 'react';

// function to generate today's date
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

// Display today's date
function TodaysDay() {
  // State to store the current date
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div>
      <p className="date">{currentDate}</p>
    </div>
  );
}

export default TodaysDay;

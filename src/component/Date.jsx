import React, { useState } from 'react';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

function TodaysDay() {
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div>
      <p className="date">{currentDate}</p>
    </div>
  );
}

export default TodaysDay;

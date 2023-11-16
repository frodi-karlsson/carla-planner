import React, { useEffect, useState } from 'react';
import './DateTitle.css';
import { IonTitle } from '@ionic/react';

export const DateTitle: React.FC = () => {
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const startDateTime = new Date();
    const [date, setDate] = useState(startDateTime.toLocaleDateString('en-US', dateOptions) + ' ' + startDateTime.toLocaleTimeString('en-US'));

  function tick() {
    const newDate = new Date();
    setDate(newDate.toLocaleDateString('en-US', dateOptions) + ' ' + newDate.toLocaleTimeString('en-US'));
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <IonTitle id="date-title">
        {date}
    </IonTitle>
  );
};

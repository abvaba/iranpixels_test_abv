import {MapContainer, TileLayer} from "react-leaflet";
import DatePicker, {DateObject} from "react-multi-date-picker"
import AddMarker from "./add-marker";
import React, {createContext, useCallback, useEffect, useState} from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TimePicker } from 'react-ios-time-picker';
export const markerContext = createContext({
  markers: {lat: 51.505, lng: -0.09},
  setMarkers: () => {}
})
const Form = () => {
  const [fieldLength, setFieldLength] = useState(0)

  const [text, setText] = useState('');
  const [pDate, setPDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [markers, setMarkers] = useState([
    {lat: 51.505, lng: -0.09}
  ]);
  const value = {markers, setMarkers};
  const [data, setData] = useState({
    text: '',
    time: time,
    date: pDate,
    locations: markers
  });
  const handleKeyPress = useCallback(e => {
    setFieldLength(e.currentTarget.value.length);
    setText(e.currentTarget.value);
  }, [fieldLength])
  const handleTime = (value) => {
    setPDate(value.toDate());
  }
  const minDate = new DateObject({ calendar: persian });
  const handleClock = (timeValue) => {
    setTime(timeValue);
  }
  useEffect(() => {
    setData({
      text,
      time,
      date: pDate,
      locations: markers
    })
  }, [text, markers, time, pDate])
  const handleSubmit = e => {
    e.preventDefault();
    console.log(data)

  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <>
      <textarea
        defaultValue=''
        rows={4}
        cols={75}
        maxLength={250}
        onChange={handleKeyPress}
      />
        <p>
          <span>{fieldLength}</span>
          /
          <span>250</span>
        </p>
      </>
      <hr/>
      <markerContext.Provider value={value}>
        <MapContainer
          style={{
            width: '50%',
            height: '350px',
            marginBlock: '2.5rem',
            marginInline: 'auto'
          }}
          center={[51.505, -0.09]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <AddMarker />
        </MapContainer>
      </markerContext.Provider>

      <hr/>
      <DatePicker
        value={pDate}
        onChange={handleTime}
        calendar={persian}
        locale={persian_fa}
        minDate={new DateObject({ calendar: persian }).set("day", minDate.day)}
      />
      <hr/>
      <TimePicker onChange={handleClock} value={time} />
      <button type="submit">ارسال</button>
    </form>
    </>
  );
};

export default Form;
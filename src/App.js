import './App.css';
import {useEffect, useState} from "react";
import Lottie from 'react-lottie';
import animationData from './assets/Animation-1699236952592.json';
import Form from "./components/form";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, [loading])
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="App">
      {loading ? <Lottie
        options={defaultOptions}
        height={400}
        width={400}
      /> : <Form />}
    </div>
  );
}

export default App;

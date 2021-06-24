import './App.css';
import LineChart from './Charts/LineChart';
import AreaZone from './Charts/AreaZone';
import Hilo from './Charts/Hilo';
import HiloOpenClose from './Charts/HiloOpenClose';
import CandleStick from './Charts/CandleStick';

function App() {
  return (
    <div className="App">
      <div className="layout">
        <LineChart />
        <AreaZone />
        <Hilo />
        <HiloOpenClose />
        <CandleStick />
      </div>
    </div>
  );
}

export default App;

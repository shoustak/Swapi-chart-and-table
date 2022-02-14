import "./App.css";
import Table from './components/Table';
import Chart from './components/Chart';

export default function App() {
  return (
    <div className="App">
     <div className="tableDiv"> <Table /> </div>
     <div className="chartDiv"> <Chart /> </div>
    </div>
  );
}

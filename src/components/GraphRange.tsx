import { SensorData, getSign } from "@/lib/utils";
import { title } from "process";
import { useState } from "react";
import { LineChart } from "@tremor/react";
type AQI = {
  date: string;
  AQI: number;
}
var state = 1;
const dataFreqAQI = (data: AQI[], interval: number): AQI[] => {
  const groupedData = new Map();
  const fileteredData = data.filter(item => !isNaN(item.AQI));
  fileteredData.forEach((item) => {
    const date = new Date(item.date);
    let key;

    switch (interval) {
      case 1: // 1 hour
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":00:00");
        break;
      case 2: // 6 hours
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+Math.floor(date.getHours() / 6) * 6+":00:00");
        break;
      case 3: // 1 day
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear());
        break;
      default:
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":00:00");
        break;
    }
  
    if (!groupedData.has(key)) {
      groupedData.set(key, { ...item, count: 1 });
    } else {
      const existing = groupedData.get(key);
      groupedData.set(key, {
        date: key,
        AQI: item.AQI + existing.AQI,
        count: existing.count + 1,
      });
    }
  });
  const averagedData: AQI[] = Array.from(groupedData.values()).map((item) => ({
    date: String(item.date),
    AQI: item.AQI/ item.count,
  }));
  // console.log(averagedData);
  return averagedData;
};
const dataFreq = (data: SensorData, interval: number): SensorData => {
  const groupedData = new Map();
  const filteredData = data.filter(item => !isNaN(item.temperature && item.pm25 && item.humidity && item.co));

  filteredData.forEach((item) =>  {
    const date = new Date(item.date);
    let key;

    switch (interval) {
      case 1: // 1 hour
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":00:00");
        break;
      case 2: // 6 hours
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+Math.floor(date.getHours() / 6) * 6+":00:00");
        break;
      case 3: // 1 day
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear());
        break;
      default:
        key = String(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":00:00");
        break;
    }
    
  
    if (!groupedData.has(key)) {
      groupedData.set(key, { ...item, count: 1 });
    } else {
      const existing = groupedData.get(key);
      groupedData.set(key, {
        date: key,
        pm25: existing.pm25 + item.pm25,
        humidity: Number(existing.humidity) + Number(item.humidity),
        co: Number(existing.co) + Number(item.co),
        temperature: Number(existing.temperature) + Number(item.temperature),
        count: existing.count + 1,
      });
    }
  });

  // Calculate the average for each interval
  const averagedData: SensorData = Array.from(groupedData.values()).map((item) => ({
    date: item.date,
    pm25: item.pm25 / item.count,
    humidity: item.humidity / item.count,
    co: item.co / item.count,
    temperature: item.temperature / item.count,
  }));
  // console.log(groupedData);
  return averagedData;
};

  
const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;


type Props = {
  data: any[];
  category?: string[];
};
export default function GraphRange({
    data,
    category = ["temperature", "co","AQI"],
  }: Props) {
    const [selected1, setSelected1] = useState(true);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);

  // Function to handle button click
  const handleButtonClick1hr = () => {
    setSelected1(true);
    setSelected2(false);
    setSelected3(false);
    state = 1;
    };
  const handleButtonClick6hr = () => {
    setSelected1(false);
    setSelected2(true);
    setSelected3(false);
    state = 2;
  };
  const handleButtonClick1day = () => {
    setSelected1(false);
    setSelected2(false);
    setSelected3(true);
    state = 3;
  };
  var plotData;
  if(category[0] == "AQI"){
    plotData = dataFreqAQI(data,state);
  }else{
    plotData = dataFreq(data,state);
  }
    return (
      <div className="block">
        <div className="flex items-start justify-between">
        </div>
      <div className="gap-4 flex">
        <button
            className={`mt-4 px-4 py-2 rounded ${selected1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={handleButtonClick1hr}
        >
            1 hr
        </button>
        <button
            className={`mt-4 px-4 py-2 rounded ${selected2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={handleButtonClick6hr}
        >
            6 hr
        </button>
        <button
            className={`mt-4 px-4 py-2 rounded ${selected3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={handleButtonClick1day}
        >
            1 day
        </button>
        
      </div>
      <div className="p-4">
        <LineChart
        data={plotData}
        // data = {data}
        index="date"
        categories={category}
        colors={["indigo", "rose"]}
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        rotateLabelX={{ angle: 0 }}
        intervalType={"equidistantPreserveStart"}
      />
      </div>
      </div>
    );
  }
  
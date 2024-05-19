"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { Icons } from "./Icons";
import { SensorData } from "@/lib/utils";
import GraphRange from "./GraphRange";
type Props = {
  data: SensorData;
};
const mockSensorData: Props = {
  data: [
    {
      date: "05/15/2024 08:00:00",
      pm25: 25,
      humidity: 55,
      co: 6,
      temperature: 22
    },
    {
      date: "05/15/2024 09:11:11",
      pm25: 27,
      humidity: 58,
      co: 5,
      temperature: 23
    },
    {
      date: "05/15/2024 09:13:11",
      pm25: 30,
      humidity: 60,
      co: 7,
      temperature: 25
    },
    {
      date: "05/15/2024 09:22:00",
      pm25: 28,
      humidity: 57,
      co: 6,
      temperature: 24
    },
    {
      date: "05/15/2024 09:40:00",
      pm25: 26,
      humidity: 56,
      co: 5,
      temperature: 23
    },
    {
      date: "05/15/2024 13:00:00",
      pm25: 24,
      humidity: 54,
      co: 4,
      temperature: 22
    },
    {
      date: "05/15/2024 14:00:00",
      pm25: 29,
      humidity: 59,
      co: 6,
      temperature: 24
    },
    {
      date: "05/15/2024 15:00:00",
      pm25: 27,
      humidity: 58,
      co: 5,
      temperature: 23
    },
    {
      date: "05/15/2024 16:00:00",
      pm25: 31,
      humidity: 61,
      co: 7,
      temperature: 26
    },
    {
      date: "05/15/2024 17:00:00",
      pm25: 28,
      humidity: 57,
      co: 6,
      temperature: 24
    }
  ]
};
export default function AirQualityCategory({ data }: Props) {
  const [category, setCategory] = useState<string>("PM 2.5 Level");
  useEffect(() => {
    setCategory("pm25");
  }, []);  
  return (
    <>
      <div className="rounded-xl border p-4">
        <h1 className="text-md md:text-xl font-semibold text-start mb-4 ">
          Air Quality Category
        </h1>
        <div className="grid lg:grid-cols-4 grid-cols-2 sm:grid-cols-4 justify-stretch gap-4">
          <div onClick={() => setCategory("pm25")}>
            <CategoryCard
              title="PM 2.5 Level"
              icon={Icons.PM_smile({ width: 30, height: 30 })}
            />
          </div>
          <div onClick={() => setCategory("temperature")}>
            <CategoryCard
              title="Temperature"
              icon={Icons.cold({ width: 30, height: 30 })}
            />
          </div>
          <div onClick={() => setCategory("himidity")}>
            <CategoryCard
              title="Humidity Level"
              icon={Icons.water({ width: 30, height: 30 })}
            />
          </div>
          <div onClick={() => setCategory("co")}>
            <CategoryCard
              title="Carbonmonoxide Level"
              icon={Icons.car({ width: 34, height: 34 })}
            />
          </div>
        </div>
      </div>
      <div className="rounded-xl border p-4 h-full">
        <h1 className="text-md md:text-xl font-semibold text-start mb-4 ">
          {category}
        </h1>
        <GraphRange  data={mockSensorData.data} category={[category]}/>
        {/* <GraphData data={mockSensorData.data} category={[category]} /> */}
      </div>
    </>
  );
}

"use client";
import React from "react";
import DashboardCard from "./DashboardCard";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/firebase";
import AirQualityTrend from "./AirQualityTrend";
import AirQualityCategory from "./AirQualityCategory";
import { mapSensorData, mapAQIData } from "@/lib/utils";
import GraphRange from "./GraphRange";
import GraphData from "./GraphData";
import { Loader } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  if (isLoading) return <Loader className="animate-spin" />;

  if (isError) throw new Error("An error occurred");

  const mappedData = mapSensorData(data);
  const currentData = mappedData[mappedData.length - 1];
  const AQIData = mapAQIData(mappedData);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-full my-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashboardCard title="PM 2.5 Level" value={currentData["pm25"]} />
            <DashboardCard
              title="Temperature"
              value={currentData["temperature"]}
            />
            <DashboardCard
              title="Humidity Level"
              value={currentData["humidity"]}
            />
            <DashboardCard
              title="Carbonmonoxide Level"
              value={currentData["co"]}
            />
          </div>
          <AirQualityTrend data={AQIData} />
        </div>
        <div className="flex flex-col gap-4">
          <AirQualityCategory data={mappedData} />
        </div>
      </div>
      <div className="border border-gray-200 w-full rounded-xl p-4 mx-auto gap-4">
        <h1 className="text-md md:text-xl text-start font-semibold">
          Air Quality Index
        </h1>
        <GraphRange data={mapAQIData(mappedData)} category={["AQI"]} />
        {/* rawdata */}
        {/* <GraphData data={mapAQIData(mappedData)} category={["AQI"]} /> */}
      </div>
    </>
  );
}

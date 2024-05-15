"use client";
import React from "react";
import DashboardCard from "./DashboardCard";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/firebase";
import loading from "@/lotties/loading.json";
import AirQualityTrend from "./AirQualityTrend";
import AirQualityCategory from "./AirQualityCategory";
import { mapSensorData, mapAQIData } from "@/lib/utils";
import GraphData from "./GraphData";
import Lottie from "react-lottie";

export default function Dashboard() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  if (isLoading)
    return <Lottie width={200} height={200} options={defaultOptions} />;

  if (isError) throw new Error("An error occurred");

  const mappedData = mapSensorData(data);
  const AQIData = mapAQIData(mappedData);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-full my-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashboardCard title="PM 2.5 Level" value={189} />
            <DashboardCard title="Temperature" value={20} />
            <DashboardCard title="Humidity Level" value={30} />
            <DashboardCard title="Carbonmonoxide Level" value={30} />
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
        <GraphData data={mapAQIData(mappedData)} category={["AQI"]} />
      </div>
    </>
  );
}

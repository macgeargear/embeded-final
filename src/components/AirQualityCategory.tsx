"use client";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { Icons } from "./Icons";
import GraphData from "./GraphData";
import { SensorData } from "@/lib/utils";

type Props = {
  data: SensorData;
};

export default function AirQualityCategory({ data }: Props) {
  const [category, setCategory] = useState<string>("PM 2.5 Level");
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
          <div onClick={() => setCategory("humidity")}>
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
        <GraphData data={data} category={[category]} />
      </div>
    </>
  );
}

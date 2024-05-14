"use client";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { Icons } from "./Icons";
import GraphData from "./GraphData";
import { generateMockData } from "@/lib/utils";

type Props = {};

export default function AirQualityCategory({}: Props) {
  const [category, setCategory] = useState<string>("PM 2.5 Level");
  return (
    <>
      <div className="rounded-xl border p-4">
        <h1 className="text-md md:text-xl font-semibold text-start mb-4 ">
          Air Quality Category
        </h1>
        <div className="grid lg:grid-cols-4 grid-cols-2 sm:grid-cols-4 justify-stretch gap-4">
          <div onClick={() => setCategory("PM 2.5 Level")}>
            <CategoryCard
              title="PM 2.5 Level"
              icon={Icons.PM_smile({ width: 30, height: 30 })}
            />
          </div>
          <div onClick={() => setCategory("Temperature")}>
            <CategoryCard
              title="Temperature"
              icon={Icons.cold({ width: 30, height: 30 })}
            />
          </div>
          <div onClick={() => setCategory("Humidity Level")}>
            <CategoryCard
              title="Humidity Level"
              icon={Icons.water({ width: 30, height: 30 })}
            />
          </div>
          <div onClick={() => setCategory("Carbonmonoxide Level")}>
            <CategoryCard
              title="Carbonmonoxide Level"
              icon={Icons.car({ width: 34, height: 34 })}
            />
          </div>
        </div>
      </div>
      <div className="rounded-xl border p-4">
        <h1 className="text-md md:text-xl font-semibold text-start mb-4 ">
          {category}
        </h1>
        <div className="grid grid-flow-col justify-stretch gap-4">
          <GraphData data={generateMockData()} />
        </div>
      </div>
    </>
  );
}

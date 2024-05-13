import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";
import DashboardCard from "./DashboardCard";
import { Icons } from "./Icons";
import LineChart from "./LineChart";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 mx-auto w-full">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
          <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
          <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
          <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
        </div>
        <DashboardCard
          title="Air Quality Level"
          value={189}
          icon={Icons.wind()}
        />
        <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
        <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
      </div>
      <div className="flex flex-col gap-4">
        <LineChart />
        <LineChart />
      </div>
    </div>
  );
}

import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";
import DashboardCard from "./DashboardCard";
import { Icons } from "./Icons";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <MaxWidthWrapper className="grid grid-cols-2 gap-4">
      <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
      <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
      <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
      <DashboardCard title="PM 2.5 Level" value={189} icon={Icons.wind()} />
    </MaxWidthWrapper>
  );
}

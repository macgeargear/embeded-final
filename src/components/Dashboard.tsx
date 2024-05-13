import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";
import DashboardCard from "./DashboardCard";
import { Icons } from "./Icons";

type Props = {};

const DASHBOARD_INFO: {
  title: string;
  value: number;
  icon: React.JSX.Element;
}[] = [
  {
    title: "PM 2.5 level",
    value: 189,
    icon: Icons.wind(),
  },
  {
    title: "PM 2.5 level",
    value: 189,
    icon: Icons.wind(),
  },
  {
    title: "PM 2.5 level",
    value: 189,
    icon: Icons.wind(),
  },
  {
    title: "PM 2.5 level",
    value: 189,
    icon: Icons.wind(),
  },
];

export default function Dashboard({}: Props) {
  return (
    <MaxWidthWrapper className="grid grid-cols-2 gap-4">
      {DASHBOARD_INFO.map((info, index) => (
        <DashboardCard key={index} {...info} />
      ))}
    </MaxWidthWrapper>
  );
}

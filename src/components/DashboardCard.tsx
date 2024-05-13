import { Wind } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  value: number;
  icon: React.JSX.Element;
};

export default function DashboardCard({ title, value, icon }: Props) {
  return (
    <div className="flex flex-col p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {icon}
      </div>
      <p className="text-4xl self-start">{value}</p>
    </div>
  );
}

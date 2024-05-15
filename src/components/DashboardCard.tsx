import { getIcon, getSign } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  value: number;
};

export default function DashboardCard({ title, value }: Props) {
  return (
    <div className="flex flex-col p-4 border rounded-xl justify-between">
      <div className="flex items-start justify-between">
        <h1 className="text-lg md:text-xl text-start font-semibold">{title}</h1>
        {getIcon(title, value)}
      </div>
      <p className="text-4xl self-start">
        {value} {getSign(title)}
      </p>
    </div>
  );
}

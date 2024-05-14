import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";
import { getWeekRange, mockTrend } from "@/lib/utils";

type Props = {};

export default function AirQualityTrend({}: Props) {
  return (
    <MaxWidthWrapper className="w-full px-0 md:px-0">
      <div className="rounded-xl w-full border p-4">
        <h1 className="text-xl font-semibold text-start mb-4">
          Air Quality Trend for this week
          <span className="text-md bg-green-500 ml-4 text-white px-2">
            {getWeekRange()}
          </span>
        </h1>

        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-200 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Day
                </th>
                <th scope="col" className="px-6 py-3">
                  Morning
                </th>
                <th scope="col" className="px-6 py-3">
                  Afternoon
                </th>
                <th scope="col" className="px-6 py-3">
                  Evening
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTrend.map((trend, i) => (
                <tr className="bg-white border-b hover:bg-gray-100" key={i}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {trend.day}
                  </th>
                  <td className="px-6 py-4">{trend.morning}</td>
                  <td className="px-6 py-4">{trend.afternoon}</td>
                  <td className="px-6 py-4">{trend.evening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

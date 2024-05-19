import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";
import {
  AQIData,
  AQITrend,
  cn,
  generateMockTrend,
  getAQITrend,
  getWeekRange,
} from "@/lib/utils";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import AQIDescriptionCard from "./AQIDescriptionCard";

type Props = {
  data: AQIData;
};

export default function AirQualityTrend({ data }: Props) {
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
              {generateMockTrend().map((trend, i) => {
                const morningTrend = getAQITrend(trend.morning);
                const afternoonTrend = getAQITrend(trend.afternoon);
                const eveningTrend = getAQITrend(trend.evening);
                return (
                  <tr className="bg-white hover:bg-gray-100" key={i}>
                    <th
                      scope="row"
                      className={cn(
                        "px-6 py-4 font-medium text-gray-900 whitespace-nowrap",
                      )}
                    >
                      {trend.day}
                    </th>
                    <td
                      className={cn("px-6 py-4 text-white", morningTrend.color)}
                    >
                      <AQIDescriptionCard
                        level={morningTrend.level}
                        desc={morningTrend.desc}
                      />
                    </td>
                    <td
                      className={cn(
                        "px-6 py-4 text-white",
                        afternoonTrend.color,
                      )}
                    >
                      <AQIDescriptionCard
                        level={afternoonTrend.level}
                        desc={afternoonTrend.desc}
                      />
                    </td>
                    <td
                      className={cn("px-6 py-4 text-white", eveningTrend.color)}
                    >
                      <AQIDescriptionCard
                        level={eveningTrend.level}
                        desc={eveningTrend.desc}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

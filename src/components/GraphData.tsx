import { LineChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

type Props = {
  data: {
    date: string;
    pm25: number;
    humidity: number;
    co: number;
    temperature: number;
  }[];
};

export default function GraphData({ data }: Props) {
  return (
    <LineChart
      className="h-80"
      data={data}
      index="date"
      categories={["pm25"]}
      colors={["indigo", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}

import { Icons } from "@/components/Icons";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SensorData = {
  date: string;
  pm25: number;
  humidity: number;
  co: number;
  temperature: number;
}[];

export function generateMockData() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = ["23", "24"];
  const data: SensorData = [];

  for (let year of years) {
    for (let month of months) {
      data.push({
        date: `${month} ${year}`,
        pm25: Math.floor(Math.random() * 100),
        humidity: Math.floor(Math.random() * 101),
        co: Math.floor(Math.random() * 20),
        temperature: Math.floor(Math.random() * 40),
      });
    }
  }

  return data;
}

export const mockTrend: {
  day: string;
  morning: string;
  afternoon: string;
  evening: string;
}[] = [
  {
    day: "Monday",
    morning: "good",
    afternoon: "normal",
    evening: "bad",
  },
  {
    day: "Tuesday",
    morning: "very good",
    afternoon: "good",
    evening: "normal",
  },
  {
    day: "Wednesday",
    morning: "normal",
    afternoon: "bad",
    evening: "very bad",
  },
  {
    day: "Thursday",
    morning: "bad",
    afternoon: "very bad",
    evening: "normal",
  },
  {
    day: "Friday",
    morning: "good",
    afternoon: "good",
    evening: "good",
  },
  {
    day: "Saturday",
    morning: "normal",
    afternoon: "bad",
    evening: "very bad",
  },
  {
    day: "Sunday",
    morning: "very good",
    afternoon: "good",
    evening: "normal",
  },
];

export function getWeekRange(date: Date = new Date()): string {
  const currentDay = date.getDay();
  const daysToMonday = (currentDay + 6) % 7;

  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - daysToMonday);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
}

export function calculateAQI(
  pm25: number,
  humidity: number,
  co: number,
  temperature: number,
): number {
  // Define ranges and weights for each parameter
  const pm25Ranges = [
    [0, 12],
    [12, 35],
    [35, Infinity],
  ]; // Low, moderate, high
  const pm25Weights = [1, 0.5, 0.3]; // Weight for each range
  const humidityRange = [30, 60]; // Average range
  const humidityWeight = 0.2;
  const coRanges = [
    [0, 9],
    [9, 35],
    [35, Infinity],
  ]; // Low, moderate, high
  const coWeights = [1, 0.5, 0.3]; // Weight for each range
  const temperatureRanges = [
    [15, 25],
    [25, 30],
    [30, Infinity],
  ]; // Low, moderate, high
  const temperatureWeights = [1, 0.5, 0.3]; // Weight for each range

  // Calculate individual scores for each parameter
  const pm25Score = pm25Ranges.reduce((acc, [rangeMin, rangeMax], index) => {
    return (
      acc +
      (pm25Weights[index] *
        (Math.min(Math.max(pm25, rangeMin), rangeMax) - rangeMin)) /
        (rangeMax - rangeMin)
    );
  }, 0);
  const humidityScore =
    ((Math.min(Math.max(humidity, humidityRange[0]), humidityRange[1]) -
      humidityRange[0]) /
      (humidityRange[1] - humidityRange[0])) *
    humidityWeight;
  const coScore = coRanges.reduce((acc, [rangeMin, rangeMax], index) => {
    return (
      acc +
      (coWeights[index] *
        (Math.min(Math.max(co, rangeMin), rangeMax) - rangeMin)) /
        (rangeMax - rangeMin)
    );
  }, 0);
  const temperatureScore = temperatureRanges.reduce(
    (acc, [rangeMin, rangeMax], index) => {
      return (
        acc +
        (temperatureWeights[index] *
          (Math.min(Math.max(temperature, rangeMin), rangeMax) - rangeMin)) /
          (rangeMax - rangeMin)
      );
    },
    0,
  );

  // Calculate weighted average of scores
  const weightedSum = pm25Score + humidityScore + coScore + temperatureScore;
  const totalWeight =
    pm25Weights.reduce((acc, val) => acc + val) +
    humidityWeight +
    coWeights.reduce((acc, val) => acc + val) +
    temperatureWeights.reduce((acc, val) => acc + val);
  const aqi = Math.round((weightedSum / totalWeight) * 100);

  // Ensure AQI is within the range of 0 to 100
  return Math.max(0, Math.min(aqi, 100));
}

export function getIcon(title: string, value: number): JSX.Element {
  switch (title) {
    case "PM 2.5 Level":
      if (value >= 0 && value < 12) {
        return Icons.PM_smile({ width: 40, height: 40 });
      } else if (value >= 12 && value <= 35) {
        return Icons.PM_natural({ width: 40, height: 40 });
      } else {
        return Icons.PM_mask({ width: 24, height: 24 });
      }
    case "Temperature":
      if (value >= 0 && value <= 25)
        return Icons.cold({ width: 40, height: 40 });
      else return Icons.fire({ width: 40, height: 40 });

    case "Humidity Level":
      if (value < 50) return Icons.desert({ width: 40, height: 40 });
      else return Icons.water({ width: 40, height: 40 });
    case "Carbonmonoxide Level":
      if (value < 35) return Icons.smile({ width: 40, height: 40 });
      else return Icons.car({ width: 40, height: 40 });
    default:
      return Icons.fire();
  }
}

export const TIME_PER_DATA = [
  {
    label: "1D",
    time: 24 * 60 * 60,
  },
  {
    label: "6H",
    time: 6 * 60 * 60,
  },
  {
    label: "1H",
    time: 60 * 60,
  },
];

export function getTimeString(time: number) {
  const date = new Date(time * 1000);
  return (
    date.toLocaleDateString("th-TH") +
    " " +
    date.toLocaleTimeString("th-TH").split(":").slice(0, 2).join(":")
  );
}

const TIME_STEP = 10 * 60;

export function getLabels(timeRange: number) {
  const timeTo = Math.floor(Date.now() / 1000);
  const timeFrom = timeTo - timeRange;
  const labels = Array(Math.floor(timeRange / TIME_STEP))
    .fill(0)
    .map((_, i) => {
      const date = new Date((timeFrom + i * TIME_STEP) * 1000);
      return (
        date.toLocaleDateString("th-TH") +
        " " +
        date.toLocaleTimeString("th-TH").split(":").slice(0, 2).join(":")
      );
    });
  return labels;
}

export function getSign(title: string): string {
  switch (title) {
    case "PM 2.5 Level":
      return "mg";
    case "Temperature":
      return "°C";
    case "Humidity Level":
      return "mg";
    case "Carbonmonoxide Level":
      return "PPM";
    default:
      return "";
  }
}

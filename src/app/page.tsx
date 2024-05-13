import LineChart from "@/components/LineChart";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl">Embeded Final lnwza</h1>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
        <LineChart />
      </MaxWidthWrapper>
    </main>
  );
}

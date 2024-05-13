import Dashboard from "@/components/Dashboard";
import LineChart from "@/components/LineChart";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MaxWidthWrapper className="">
        <div className="py-20 mx-auto text-center flex flex-col items-center">
          <Dashboard />
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

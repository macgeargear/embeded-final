import Dashboard from "@/components/Dashboard";
import LineChart from "@/components/LineChart";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MaxWidthWrapper className="-mt-10">
        <div className="py-20 mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl font-semibold my-8">
            Embeded System final project
          </h1>
          <Dashboard />
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

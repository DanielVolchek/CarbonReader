import FileWrapper from "@/components/FileWrapper";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center bg-slate-600">
      <h1 className="text-white text-4xl text-center mb-4">
        Remote File Explorer
      </h1>
      <FileWrapper />
    </main>
  );
}

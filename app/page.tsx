export default function Home(): JSX.Element {
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <canvas
          width={1000}
          height={1000}
          className="border border-black rounded-md"
        />
      </div>
    </div>
  );
}

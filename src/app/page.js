import Login from "./components/Login";
import Send from "./components/Send";

export default function Home() {
  return (
    <main className="flex flex-col gap-[100px]">
      <section className=" w-full text-center">
        <h1>XRPL NFT AND FT Example</h1>
      </section>
      <Login />
      <Send />
    </main>
  );
}

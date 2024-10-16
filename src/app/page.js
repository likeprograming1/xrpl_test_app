import Login from "./components/Login";

export default function Home() {


  return (
    <main className="flex flex-col gap-[100px]">
      <section className=" w-full text-center">
        <h1 className=" text-[2rem]">XRPL NFT AND FT Example</h1>
      </section>
      <Login />
    </main>
  );
}

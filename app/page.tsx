import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-yellow-300 to-white overflow-hidden">

      {/* First aside */}
      <aside className="w-1/2 h-screen flex flex-col justify-center gap-6 px-20">
        <p className="text-5xl font-bold text-gray-950 leading-tight">
          Redefining urban travel with
          <br />
          <span className="text-yellow-500">smarter, faster</span> and
          <span className="text-yellow-500"> safer rides</span> at your fingertips.
        </p>

        <p className="text-xl text-gray-700 font-medium">
          Smarter Rides, Safer Journeys
        </p>

        <div className="flex gap-4 mt-4">
          <Link href={"/logIn"}>
            <button className="w-28 py-3 bg-gray-950 text-white font-medium rounded-xl shadow-md hover:bg-gray-800 transition-all duration-200 cursor-pointer">
              Log In
            </button>
          </Link>

          <Link href={"/signUp"}>
            <button className="w-28 py-3 bg-gray-950 text-white font-medium border rounded-xl shadow-md hover:bg-gray-800 transition-all duration-200 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </aside>

      {/* second aside */}
      <aside className="w-1/2 h-screen flex justify-center items-center">
        <div className="w-full h-full relative">
          <Image
            src="/taxi.png"
            alt="Taxi Illustration"
            fill
            className="object-contain"
          />
        </div>
      </aside>

    </section>
  );
}

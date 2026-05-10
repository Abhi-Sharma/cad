import Link from "next/link";
import Image from "next/image";
import { dwgs } from "@/data/dwgs";

export default function Home() {
  const entries = Object.entries(dwgs);

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen px-6 py-16">
      <main className="w-full max-w-2xl bg-card border border-border rounded-2xl p-8 shadow-sm">
        {/* Joke Section */}
        <div className="relative group mb-12 text-center">
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl inline-block">
            <Image
              src="/joke-coding.png"
              alt="bsdk"
              width={800}
              height={500}
              className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-[1.02]"
              priority
            />
            <div className="p-6 bg-gradient-to-t from-card to-transparent absolute bottom-0 left-0 right-0">
              <h2 className="text-xl font-bold text-primary mb-2 italic drop-shadow-md">
                "KUSH BI NI HA BRO"
              </h2>
              <p className="text-white text-sm font-bold drop-shadow-md">
                BSDK
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

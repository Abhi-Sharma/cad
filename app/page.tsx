import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[80vh] px-6 py-12">
      <main className="w-full max-w-3xl text-center">
        {/* Joke Section */}
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/joke-coding.png"
              alt="bsdk"
              width={800}
              height={500}
              className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-[1.02]"
              priority
            />
            <div className="p-6 bg-gradient-to-t from-card to-transparent">
              <h2 className="text-xl font-bold text-primary mb-2 italic">
                "KUSH BI NI HA BRO"
              </h2>
              <p className="text-muted-foreground text-sm">
                BSDK
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

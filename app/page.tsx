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
              alt="It works on my machine"
              width={800}
              height={500}
              className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-[1.02]"
              priority
            />
            <div className="p-6 bg-gradient-to-t from-card to-transparent">
              <h2 className="text-xl font-bold text-primary mb-2 italic">
                "It works on my machine"
              </h2>
              <p className="text-muted-foreground text-sm">
                The universal mantra of every student facing a compiler error.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-purple-500">
          The Ultimate Student Toolkit
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Access high-performance lab programs, premium study resources, and 
          tools designed to help you ace your academic journey.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/pages"
            className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105"
          >
            Go to Programs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-full hover:bg-secondary/80 transition-all"
          >
            Join the Community
          </a>
        </div>
      </main>
    </div>
  );
}

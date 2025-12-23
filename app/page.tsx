import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">

        {/* About Section */}
        <div className="flex flex-col gap-8">
          <p className="text-[#4A4C56] font-bold text-center text-xl md:text-left">
            The Strongest Home You Can Buy. Custom Built in 10 Days.
          </p>

          <p className="text-[#4A4C56] text-center text-lg md:text-left">
            A Freepoint Home is a steel house engineered to be permanent,
            indestructible, and flexible enough to move whenever you need.
            Built from <strong> best-in-class steel construction </strong> and cement, with a
            full 8'6"+ interior width  and a 9'6" high ceiling,
            it delivers more livable volume than any other single piece
            home in its class.
          </p>

          <p className="text-[#4A4C56] text-center text-lg md:text-left">
            It <strong> arrives fully finished, requires no permits</strong>, and can be placed
            almost anywhere. Just <strong> plug it into a standard outlet, connect a garden
              hose</strong>, and it’s ready to live in. It’s fully self sufficient from day one
            but also built to connect to standard utilities when used as an ADU. Every unit
            is fully customizable, and with <strong> white glove delivery </strong> and the ability to relocate it anytime,
            you get the durability of a permanent structure with the freedom of
            mobility — all custom built in just 10 days.
          </p>


        </div>

        {/* Image Section */}
        <div className="flex flex-col gap-4">

          <Image
            src="/images/about/image1.png"
            alt="home"
            width={450}
            height={450}
            className="w-full md:max-w-[25vw] max-h-[45vh] md:max-h-[25vh] object-cover rounded-xl mx-auto"
          />
          <Image
            src="/images/about/D1.jpg"
            alt="home"
            width={450}
            height={450}
            className="w-full md:max-w-[25vw] max-h-[45vh] md:max-h-[25vh] object-cover rounded-xl mx-auto"
          />

        </div>

      </div>




      {/* CTA */}
      <div className="text-center mt-16">
        <a href="/customizations">
          <button className="bg-[#C2A45C] hover:bg-[#C2A45C]/80 transition-all duration-300 text-white px-10 py-4 rounded-md font-semibold">
            Customize Now
          </button>
        </a>
      </div>


    </div>


  );
}

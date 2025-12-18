import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">

        {/* About Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-3xl md:text-4xl text-center md:text-left font-sans font-semibold">
            About Us
          </h1>

          <p className="text-[#4A4C56] font-bold text-center md:text-left">
            The Strongest Home You Can Buy. Custom Built in 10 Days.
          </p>

          <p className="text-[#4A4C56] text-center md:text-left">
            A Freepoint Home is a steel house engineered to be permanent,
            indestructible, and flexible enough to move whenever you need.
            Built from <strong> best-in-class steel construction and cement</strong>, with a
            full <strong> 8'6"+ interior width </strong> and a <strong>9'6" high ceiling</strong>,
            it delivers more livable volume than any other single piece
            home in its class.
          </p>

          <p className="text-[#4A4C56] text-center md:text-left">
            It arrives <strong> fully finished, requires no permits</strong>, and can be placed
            almost anywhere. Just plug it into a standard outlet, connect a garden
            hose, and it’s ready to live in. It’s fully self sufficient from day one
            but also built to connect to standard utilities when used as an ADU. Every unit
            is <strong> fully customizable</strong>, and with <strong> white glove delivery </strong> and the ability to relocate it anytime,
            you get the durability of a permanent structure with the freedom of
            mobility — all <strong> custom built in just 10 days</strong>.
          </p>

          <div className="flex justify-center">
            <Link href="/customizations">
              <button className="bg-[#C2A45C] hover:bg-[#C2A45C]/80 transition-all duration-300 text-white px-6 py-2 rounded-md cursor-pointer">
                Customize Now
              </button>
            </Link>
          </div>

        </div>

        {/* Image Section */}
        <div className="flex flex-col gap-6">

          <Image
            src="/images/about/image1.png"
            alt="home"
            width={500}
            height={500}
            className="w-full md:max-w-[25vw] max-h-[45vh] md:max-h-[25vh] object-cover rounded-xl mx-auto"
          />
          <Image
            src="/images/about/D1.jpg"
            alt="home"
            width={500}
            height={500}
            className="w-full md:max-w-[25vw] max-h-[45vh] md:max-h-[25vh] object-cover rounded-xl mx-auto"
          />

        </div>

      </div>
    </div>


  );
}

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
          <p className="text-[#4A4C56] text-center md:text-left">
            At Freepoint Homes, we believe that a home should be more than just a place to live—it should be a space that reflects your style, meets your needs, and enhances your lifestyle. We are dedicated to providing innovative, high-quality modular homes that give you the freedom to customize your living space, all while staying within your budget.
          </p>

          <p className="text-[#4A4C56] text-center md:text-left">
            Founded with a vision to revolutionize the way homes are built and designed, Freepoint Homes offers a modern, flexible approach to home construction. We specialize in modular homes that allow for customization at every step. Whether you're looking for a sustainable design, an open-concept layout, or modern finishes, we work with you to bring your dream home to life.
          </p>

          <Link href="/customizations" className="w-fit mx-auto md:mx-0">
            <button className="bg-[#C2A45C] hover:bg-[#C2A45C]/80 transition-all duration-300 text-white px-6 py-2 rounded-md cursor-pointer">
              Customize Now
            </button>
          </Link>
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

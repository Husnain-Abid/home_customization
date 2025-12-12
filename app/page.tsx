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
            In just two weeks, you can have a fully functioning, customizable home delivered to your property—no permits required.

          </p>

          <p className="text-[#4A4C56] text-center md:text-left">
            Built from indestructible steel and designed to last a lifetime, each unit comes complete with finished interiors, modern amenities, and the flexibility to fit your lifestyle.  This home is about true independence and self reliance. It can serve as a guest house in your yard, an Airbnb rental, or a private retreat.
          </p>

          <p className="text-[#4A4C56] text-center md:text-left">
            With off grid solar capability, you can live sustainably without reliance on external utilities. And with the option to make it mobile by placing it on a trailer, your home can move with you wherever life takes you. More than a tiny home, it’s a versatile, durable solution that empowers you to create your own space, generate your own power, and enjoy the freedom of living on your own terms.
          </p>

          <p className="text-[#4A4C56] text-center md:text-left">
            Customize your unit today, explore pricing, and start a conversation with us to design a home that fits your exact needs and requirements.
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

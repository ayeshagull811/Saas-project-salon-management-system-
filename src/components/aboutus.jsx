"use client";
import Image from "next/image";
import salon from "../assets/img1.jpeg";
import team from "../assets/img2.jpeg";
import imgaes from "../assets/img3.jpeg";

export default function AboutSection() {
  return (
    <section className="bg-amber-700 relative rounded-4xl h-[400px] md:h-[450px] my-12 md:my-16 lg:my-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
          <div className="px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white my-4 md:my-6 lg:my-7">About Us</h2>
            <p className="text-white/70 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
              Welcome to{" "}
              <span className="font-semibold">Glamour Touch Salon</span>, where
              beauty meets relaxation. We specialize in luxurious hair, skin,
              and spa treatments to help you feel and look your best. Our expert
              stylists and therapists bring years of experience, ensuring you
              receive the perfect service tailored to your style.
            </p>
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              From elegant haircuts to rejuvenating spa therapies, we promise an
              experience that blends comfort, style, and care. Come in, unwind,
              and leave glowing inside and out.
            </p>
          </div>
          <div className="relative hidden md:block">
            <div className="bg-amber-50 rounded-full w-[180px] md:w-[200px] lg:w-[240px] h-[180px] md:h-[200px] lg:h-[240px] absolute -bottom-5 left-[100px] md:left-[150px] lg:left-[200px]">
              <Image
                src={team}
                alt="Salon Interior"
                width={600}
                height={400}
                className="rounded-full h-[140px] md:h-[160px] lg:h-[200px] w-[140px] md:w-[160px] lg:w-[200px] left-5 top-5 absolute object-cover"
              />
            </div>
            <div className="bg-amber-50 rounded-full w-[180px] md:w-[200px] lg:w-[240px] h-[180px] md:h-[200px] lg:h-[240px] absolute -top-10 left-[50px] md:left-[75px] lg:left-[100px]">
              <Image
                src={salon}
                alt="Salon Team"
                width={300}
                height={200}
                className="rounded-full h-[140px] md:h-[160px] lg:h-[200px] w-[140px] md:w-[160px] lg:w-[200px] left-5 top-5 absolute object-cover"
              />
            </div>
            <div className="bg-amber-50 rounded-full w-[180px] md:w-[200px] lg:w-[240px] h-[180px] md:h-[200px] lg:h-[240px] absolute -top-10 left-[150px] md:left-[200px] lg:left-[300px]">
              <Image
                src={imgaes}
                alt="Happy Client"
                width={300}
                height={200}
                className="rounded-full h-[140px] md:h-[160px] lg:h-[200px] w-[140px] md:w-[160px] lg:w-[200px] left-5 top-5 absolute object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

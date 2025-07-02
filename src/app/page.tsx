"use client";

import "keen-slider/keen-slider.min.css";
import "./carousal.css";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
  Images,
  MenuIcon,
} from "lucide-react";
import { div, img } from "framer-motion/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

type MiddleNavType = {
  linkName: string;
  dest: string;
};

type DivisionType = MiddleNavType;

const middleNavList: Array<MiddleNavType> = [
  { linkName: "About", dest: "/about" },
  { linkName: "Divisions", dest: "/divisions" },
  { linkName: "Team", dest: "/team" },
  { linkName: "Media Center", dest: "/mediaCenter" },
  { linkName: "Sustainability", dest: "/sustainability" },
  { linkName: "Careers", dest: "/careers" },
  { linkName: "Contact Us", dest: "/contactUs" },
];

type DivisionImgType = {
  imgName: string;
  imgText: string;
};

type AsideScreenTypes = "main" | "division" | "media";

const divisions: Array<DivisionType> = [
  { linkName: "Yulax Paint", dest: "/yulaxPaint" },
  { linkName: "Yulax ArtWork", dest: "/artwork" },
  { linkName: "Interior and Exterior Decorations", dest: "/decorations" },
];

const heroImgs: string[] = [
  "/images/13.jpg",
  "/images/69.jpg",
  "/images/77.jpg",
  "/images/79.jpg",
];
const artWorkImgs: string[] = [
  "/images/61.jpg",
  "/images/62.jpg",
  "/images/71.jpg",
  "/images/73.jpg",
  "/images/75.jpg",
  "/images/76.jpg",
  "/images/72.jpg",
  "/images/69.jpg",
  "/images/13.jpg",
];

const divisionImages: Array<DivisionImgType> = [
  { imgName: "/images/13.jpg", imgText: "Yulax Paint" },
  { imgName: "/images/69.jpg", imgText: "Yulax ArtWork" },
  { imgName: "/images/77.jpg", imgText: "Interior and Exterior Decorations" },
  { imgName: "/images/79.jpg", imgText: "Miscellenous" },
];

export default function Home() {
  const [heroImages, setHeroImages] = useState<string[]>(heroImgs);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [asideScreen, setAsideScreen] = useState<AsideScreenTypes>("main");
  const [showAside, setShowAside] = useState<boolean>(true);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    slides: { perView: 1 },
    created() {},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // setPrevIndex(index);
      setCurrentSlide((prvIndex) => (prvIndex + 1) % heroImgs.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <>
      <aside
        className={`fixed w-[100%] h-[100%] top-0 left-0 bg-gray-200 ${
          showAside ? "flex" : "hidden"
        } flex-col justify-center`}
        style={{ zIndex: 50000 }}
      >
        {asideScreen === "main" && (
          <div className="relative">
            <ul className="">
              {middleNavList.map((midNav, index) => (
                <Link
                  key={index}
                  href={midNav.linkName !== "Divisions" ? midNav.dest : ""}
                  className="text-lg font-semibold py-1.5 px-2 hover:bg-gray-200 relative z-50 block text-center"
                  id={midNav.linkName === "Divisions" ? "dropdown" : ""}
                  onClick={
                    midNav.linkName === "Divisions"
                      ? () => setAsideScreen("division")
                      : () => console.log("")
                  }
                >
                  {midNav.linkName}
                  {midNav.linkName === "Divisions" && (
                    <ul
                      className="absolute shadow bg-white rounded top-[100%] left-0 w-[200px]"
                      id="drop-content"
                      style={{ zIndex: 999999 }}
                    >
                      {divisions.map((dropItem, index) => (
                        <Link
                          href={dropItem.dest}
                          key={index}
                          className="block hover:bg-gray-200 transition-all duration-75 p-3 "
                        >
                          <h3 className="text-black font-semibold text-sm">
                            {dropItem.linkName}
                          </h3>
                        </Link>
                      ))}
                    </ul>
                  )}
                </Link>
              ))}
            </ul>
          </div>
        )}

        {asideScreen === "division" && (
          <div>
            <h1 className="text-center">
              <span
                onClick={() => setAsideScreen("main")}
                className="cursor-pointer"
              >
                Back
              </span>
            </h1>
            <ul>
              {divisions.map((dropItem, index) => (
                <Link
                  href={dropItem.dest}
                  key={index}
                  className="block hover:bg-gray-200 transition-all duration-75 p-3 text-center"
                >
                  <h3 className="text-black font-semibold text-sm">
                    {dropItem.linkName}
                  </h3>
                </Link>
              ))}
            </ul>
          </div>
        )}
        <span
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowAside(false)}
          style={{ zIndex: 50001 }}
        >
          X
        </span>
      </aside>
      <header style={{ position: "sticky", top: 0, zIndex: 20000 }}>
        <div className="flex justify-between bg-gray-100 py-6 px-14 items-center">
          <h1 className="text-4xl font-semibold">Yulax Craft</h1>
          <div className="hidden lg:block">
            <ul className="flex">
              {middleNavList.map((midNav, index) => (
                <Link
                  key={index}
                  href={midNav.dest}
                  className="text-lg font-semibold py-1.5 px-2 hover:bg-gray-200 relative z-50"
                  id={midNav.linkName === "Divisions" ? "dropdown" : ""}
                >
                  {midNav.linkName}
                  {midNav.linkName === "Divisions" && (
                    <ul
                      className="absolute shadow bg-white rounded top-[100%] left-0 w-[200px]"
                      id="drop-content"
                      style={{ zIndex: 99999 }}
                    >
                      {divisions.map((dropItem, index) => (
                        <Link
                          href={dropItem.dest}
                          key={index}
                          className="block hover:bg-gray-200 transition-all duration-75 p-3 "
                        >
                          <h3 className="text-gray-500 font-semibold text-sm">
                            {dropItem.linkName}
                          </h3>
                        </Link>
                      ))}
                    </ul>
                  )}
                </Link>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-10">
              <li>
                <InstagramIcon size={20} />
              </li>
              <li>
                <YoutubeIcon size={20} />
              </li>
              <li>
                <LinkedinIcon size={20} />
              </li>
            </ul>
          </div>
          <div className="block lg:hidden cursor-pointer">
            <MenuIcon onClick={() => setShowAside(true)} />
          </div>
        </div>
      </header>
      <main>
        <div className="relative">
          {/* <AnimatePresence mode="wait">
            <motion.img
              key={heroImgs[index]}
              src={heroImgs[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-full h-full object-cover"
              // style={{ width: "100%", height: "70vh" }}
            />
          </AnimatePresence> */}
          <Swiper
            effect="fade"
            loop={true}
            speed={2000}
            autoplay={{ delay: 4000 }}
            modules={[EffectFade, Autoplay]}
            fadeEffect={{ crossFade: true }}
            className="h-[400px] w-full z-10"
          >
            <SwiperSlide>
              <img src="images/13.jpg" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="images/69.jpg" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="images/77.jpg" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="images/79.jpg" className="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
          <div className="text-gray-300 text-3xl font-semibold absolute top-[50%] w-full text-center translate-y-[-50%] z-50">
            <span className="bg-black rounded-xl py-4 px-6">
              Welcome To The Yulax Craft Division
            </span>
          </div>
        </div>
        <div className="py-20">
          <h1 className="text-4xl text-center tracking-widest text-gray-800 font-bold mb-10">
            The Group
          </h1>
          <div className="w-[95%] sm:w-[85%] md:w-[55%] mx-auto">
            <p className="text-lg leading-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum autem ipsam consectetur ipsum, natus ratione repellat
              quam itaque officia! Dolore, et! Debitis excepturi fuga voluptatum
              natus nulla et voluptates. Recusandae nesciunt temporibus
              consectetur magnam numquam ipsum odit illo aperiam vero
            </p>
          </div>
        </div>
        <div className="bg-gray-300 py-24">
          <h1 className="text-4xl text-center tracking-widest text-gray-800 font-bold mb-10">
            Divisions
          </h1>
          <div className="w-[95%] sm:w-[85%] md:w-[55%] mx-auto">
            <p className="text-lg leading-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum autem ipsam consectetur ipsum, natus ratione repellat
              quam itaque officia! Dolore, et! Debitis excepturi fuga voluptatum
              natus nulla et voluptates. Recusandae nesciunt temporibus
              consectetur magnam numquam ipsum odit illo aperiam vero
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-8">
            {divisionImages.map((im, index) => (
              <div key={index} className="relative">
                <Image
                  height={250}
                  width={250}
                  src={im.imgName}
                  alt="not found"
                  className="rounded w-full"
                />
                <motion.h1
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white bg-gray-900 p-3 text-center font-semibold"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  // viewport={{ once: false }}
                >
                  {im.imgText}
                </motion.h1>
              </div>
            ))}
          </div>
        </div>
        <div className="py-24 space-y-6">
          <div className="w-[95%] sm:w-[85%] md:w-[55%] lg:w-[45%] mx-auto">
            <h1 className="text-5xl tracking-widest text-gray-800 font-bold mb-10">
              Mission
            </h1>
            <p className="text-lg leading-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum autem ipsam consectetur ipsum, natus ratione repellat
              quam itaque officia! Dolore, et! Debitis excepturi fuga voluptatum
              natus nulla et voluptates. Recusandae nesciunt temporibus
            </p>
          </div>
          <div className="w-[95%] sm:w-[85%] md:w-[55%] lg:w-[45%] mx-auto">
            <h1 className="text-5xl tracking-widest text-gray-800 font-bold mb-10">
              Vision
            </h1>
            <p className="text-lg leading-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum autem ipsam consectetur ipsum, natus ratione repellat
              quam itaque officia! Dolore, et! Debitis excepturi fuga voluptatum
              natus nulla et voluptates. Recusandae nesciunt temporibus
              consectetur magnam numquam ipsum odit illo aperiam vero
            </p>
          </div>
        </div>
        <div className="py-20 bg-gray-300">
          <h1 className="text-4xl text-center tracking-widest text-gray-800 font-bold mb-10">
            Some of Our ArtWorks
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-6">
            {artWorkImgs.map((im, index) => (
              <div>
                <Image
                  height={750}
                  width={450}
                  src={im}
                  alt="not found"
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 py-36">
        <div className="grid grid-cols-3 justify-center">
          <ul className="space-y-4">
            <li className="text-center text-lg font-semibold text-gray-300">
              Location
            </li>
            <li className="text-center text-lg font-semibold text-gray-300">
              2306, Marina Plaza, Dubai Marina
            </li>
            <li className="text-center text-lg font-semibold text-gray-300">
              PO Box 120817, Dubai, UAE
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="text-center text-lg font-semibold text-gray-300">
              Contact
            </li>
            <li className="text-center text-lg font-semibold text-gray-300">
              PaulXander@gmail.com
            </li>
            <li className="text-center text-lg font-semibold text-gray-300">
              08111222333
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="text-center text-lg font-semibold text-gray-300">
              Hours
            </li>
            <li className="text-center text-lg font-semibold text-gray-300">
              Monday - Friday
            </li>
            <li className="text-center text-lg font-semibold text-gray-300">
              10am - 6pm
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

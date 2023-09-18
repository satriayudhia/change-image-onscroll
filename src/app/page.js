"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Loading from "./components/Loading";
import { data } from "./data";

// const data = [
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES000.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES001.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES002.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES003.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES004.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES005.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES006.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES007.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES008.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES009.png.jpeg",
//   "https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES010.png.jpeg",
// ];

export default function Home() {
  const [value, setValue] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;

      setValue(scrollTop);

      const percent = (scrollTop / viewportHeight) * 100;
      console.log(percent);

      setPercentage(percent);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ImagesComponent = ({ urls, setImagesLoaded }) => {
    const onLoad = (index) => {
      if (index === urls.length - 1) {
        setImagesLoaded(true);
      }
    };

    return (
      <>
        {urls.map((url, index) => (
          <Image
            src={url}
            fill
            objectFit="cover"
            alt="1"
            onLoad={() => onLoad(index)}
            style={{
              opacity: (index / urls.length) * 100 <= percentage ? 1 : 0,
            }}
            key={url}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div
          className="container-all"
          style={{ transform: `translate(0px, ${value}px)` }}
          ref={ref}
        >
          <div style={{ visibility: !isImageLoaded ? "visible" : "hidden" }}>
            <Loading />
          </div>
          <div style={{ visibility: !isImageLoaded ? "hidden" : "visible" }}>
            <ImagesComponent urls={data()} setImagesLoaded={setIsImageLoaded} />
          </div>
        </div>
      </div>
    </>
  );
}

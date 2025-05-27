// HeroComponent.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroBySlug, resetHero } from "../Store/slice/heroSlice";

const Hero = ({ slug }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHeroBySlug(slug));
  }, [dispatch, slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  if (!data) return null;

  const {
    styleType,
    title,
    subtitle,
    description,
    image,
    Button = [],
  } = data[0];
const baseURL = import.meta.env.VITE_STRIPE_imgUrl;
  switch (styleType) {
    case "hero":
      return (
       <div className="relative min-h-[50vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 bg-[fafafa] text-black">
  {/* Left Content */}
  <div
    className="w-full md:w-1/2 text-center overflow-visible md:text-left relative z-20"
 // negative margin to push text over image
  >
    {subtitle && (
      <p className=" text-3xl lg:text-4xl xl:text-6xl italic text-gray-600 mb-2">{subtitle}</p>
    )}
   <h1 className="text-4xl lg:text-5xl xl:text-8xl font-bold overflow-visible whitespace-nowrap mb-4">
        {title}
        </h1>
    {description && (
      <p className="text-2xl md:text-lg text-gray-700 mb-6">{description}</p>
    )}
    <div className="flex flex-wrap justify-center md:justify-start gap-4">
      {Button.map((btn) => (
        <a
          key={btn.id}
          href={btn.url}
          className={`py-4 px-17.5  border text-sm font-semibold transition ${
            btn.variant === "primary"
              ? "bg-black text-white hover:bg-gray-800"
              : "border-black text-black hover:bg-black hover:text-white"
          }`}
        >
          {btn.text}
        </a>
      ))}
    </div>
  </div>

  {/* Right Image */}
  <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10">
    <img
      src={baseURL + image?.url} // Replace with actual image path or dynamic data
      alt="Hero Visual"
      className="w-full object-contain"
    />
  </div>
</div>
      );

    case "promo":
      return (
        <div className="flex flex-col md:flex-row items-center bg-white text-black overflow-y-hidden max-h-[520px]  ">
      {/* Left Image */}
      <div className="w-full md:w-6/10 flex h-auto justify-center ">
  <img
    src={baseURL + image?.formats?.medium?.url || baseURL + image?.url}
    alt={title || 'Promo Image'}
    className="w-full  h-auto object-contain"
  />
</div>
      {/* Right Text */}
      <div className="w-full md:w-4/10 flex flex-col justify-center items-center text-center md:text-left">
        <h2 className="text-5xl font-bold mb-4">{title}</h2>
        {/* Add more text content if available, e.g. description or subtitle */}
      </div>
    </div>
      );

    case "text-only":
      return (
        <div className="min-h-[200px] bg-gray-100 text-gray-800 flex items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold uppercase">{title}</h1>
        </div>
      );

    default:
      return (
        <div className="min-h-[300px] flex items-center justify-center text-center bg-gray-200 px-4">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      );
  }
};

export default Hero;

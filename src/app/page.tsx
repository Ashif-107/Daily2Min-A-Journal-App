/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import pencilbg from '../../public/images/pencilbg.jpg';
import intro from '../../public/images/intro.png'
import Loginnav from "./ui/homepage/Loginnav";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-cover bg-center lg:overflow-hidden"
      style={{
        backgroundImage: `url(${pencilbg.src})`,
      }} >
      <Loginnav />
      <div className="flex flex-col md:flex-row h-full font-semibold">
        <div className="leftside flex-1 px-8 flex flex-col py-12 justify-center">
          <h1 className="text-red-500 text-4xl mb-8 font-extrabold">Welcome to Your Daily Journal</h1>
          <p className="text-xl text-gray-800 text-justify md:text-2xl lg:text-3xl md:leading lg:leading-relaxed">
            Kickstart your journaling habit with our simple & effective approach. Based on the 
             <strong className="text-red-500 bg-[#E0C580]"> 2-Mins Rule from James Clear's Atomic Habits,</strong>
            this platform helps you overcome procrastination and build a consistent journaling routine. Start small, stay consistent, and watch your progress grow with streak tracking and personalized insights.
            Make journaling a daily habit with just two minutes of your day.
          </p>
        </div>
        <div className="rightside flex-1 flex items-center">
            <Image
              src={intro.src}
              alt="pencilbg"
              width={1000}
              height={700}>
            </Image>
        </div>
      </div>
    </div>
  );
}

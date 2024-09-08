'use client'
import Image from "next/image";
import thirty from '../../../../public/images/thirty.png'
import book from '../../../../public/images/book.jpeg'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
/* eslint-disable react/no-unescaped-entities */
export default withPageAuthRequired(function Page() {
    return (
        <div className="min-h-screen">
            <h1 className="text-4xl text-center text-yellow-400 font-bold">Welcome To Daily2Min</h1>
            <div className="text-white justify-center mt-8">
                <div className="text-center">
                    <h2 className="text-xl">Disclimer: I would recommend you all to read the full book of Atomic Habits to get the valuable life lesson which would help you to get better you</h2><br />
                    <div className="text-[1.5rem] p-4">
                        <p className="align-justify">
                            I hope everyone here are eager to develope good habits..This One will really help you to get the real use of your habits<br /><br />
                            The Main motive of Atomic habits is to prove that, Small Habits Can make A Big Difference. The Arthor James Clear,
                            validating this with help of maths..  <strong className="text-purple-400">If you can get 1 percent better each day
                                for one year, you'll end up thirty-seven times better by the time you'r done. </strong>Conversly
                            if you get 1 percent worse each day for one year, you'll decline nearly down to zero. <br />
                        </p> <br />
                        <ul className="text-yellow-400"><li>1% better each day: 1.01^365 = 37.78 </li><li>1% worse each day: 0.99^365 = 00.03</li></ul>
                        <Image
                            src={thirty}
                            alt="Atomic Habits"
                            width={400}
                            height={400}
                            className="mx-auto my-5"
                        />
                        <p>
                            Yeah Now comes the <strong className="text-purple-400"> Two miniute rule </strong>  which will definitely help you not only in developing
                            Journal habits but also every habit you are about to start. When you start a new havit, it should less than 2 minute.
                            This idea is to make your habit as easy as possible to start.   <br /> <br />
                            You may think writing for only two minutes is weird to get hyped. But the point is not to do one thing. The point is to master the habit of Showing Up.
                            You can see many examples of this rule in Atomic habit chapter 13.  <br /> <br />
                            <strong className="text-yellow-400">
                                The more you ritualize the beginning of a process, the more likely it becomes that you can slip
                                into the state of deep focus that is required to do great things
                            </strong>
                            <br /> <br />
                            <strong className="text-pink-600">
                                I hope you are ready to utilize the max benefit of Daily2Min.. Lets dive into it..  <br /> <br /> <br />
                            </strong>
                        </p>
                        <h1 className="mb-5 text-3xl ">About the creator</h1>
                        <p>A very thanks to James Clear for showlighting the real importants of Atomic habits in the life. This book has been a very close to my heart. Made me to
                            think about every bad habits I have been doing so far and the good habits which has to be started in my life. One of the best book I have read and would recommend
                            this to anyone. Passionate but lazy, you have to read this book
                        </p>
                        <Image
                            src={book}
                            alt="Atomic Habits"
                            width={600}
                            height={600}
                            className="mx-auto my-5 rounded-lg"
                        />

                    </div>
                    <div className="footer p-7 bg-[#282828] text-2xl flex justify-between items-center">

                        <p className="text-justify"><strong className="text-red-500"> Created by Ashif</strong> <br />
                            <strong className="text-red-500">Email: mohamedashif1911@gmail.com</strong> <br />
                            <strong className="text-red-500">GitHub: Ashif-107</strong>
                        </p>
                        <div className="flex space-x-6 ">
                            <a href="https://github.com/Ashif-107" target="_blank" rel="noopener noreferrer">
                                <FaGithub size={60} className="hover:text-gray-600 transition-colors duration-300" />
                            </a>
                            <a href="https://www.linkedin.com/in/mohamed-ashif-k-m" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={60} className="hover:text-blue-600 transition-colors duration-300" />
                            </a>
                            <a href="https://www.instagram.com/ash_if_107" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={60} className="hover:text-pink-600 transition-colors duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})
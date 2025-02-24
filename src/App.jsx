import { useState } from "react";
import "./app.css";
import img from "./assets/IMG_34612.png"
import aboutMe from "./assets/DALL.webp"
import TabCard from "./TabCard";

function App() {
  const [serviceTab, setServiceTab] = useState(1)
  return (
    <>
      <nav className="flex justify-between items-center py-5 px-32 bg-[#03191d] text-white">
        <h1 className="text-2xl font-semibold">PORTFOLIO</h1>
        <div className="flex items-center gap-8">
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">About Me</button>
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">Services</button>
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">Projects</button>
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">Contact Me</button>
        </div>
      </nav>
      <div className="s-container">
        <svg className="s-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0,25 C25,70 75,-30 100,20 V40 H0 Z" fill="white" />
        </svg>

        <div className="text-white grid grid-cols-2 gap-10 items-center h-full">
          <div className="px-16 flex flex-col items-center gap-2">
            <div className="max-w-[70%]">
              <h1 className="text-5xl">Najmus Sakib</h1>
              <p className="pb-10">Web Developer</p>
              <p className="tracking-wide">To excel as a Web Developer in an innovative environment
                that fosters learning and growth. I aim to leverage my technical skills and
                passion for creating exceptional web applications to drive user-centered design
                and contribute to the success of projects that push the boundaries of digital experiences.</p>
            </div>
          </div>
          <div className="z-10">
            <div className="flex justify-center">
              <div className="">
                <img src={img} alt="avatar" className="max-h-[600px] rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-[30vh]">
        <div className="grid grid-cols-3 bg-[#03191d] text-white">
          <button className={`p-4 hover:bg-[#154047] text-lg ${serviceTab === 1 ? "bg-[#154047]" : ""}`} onClick={() => setServiceTab(1)}>Skills</button>
          <button className={`p-4 hover:bg-[#154047] text-lg ${serviceTab === 2 ? "bg-[#154047]" : ""}`} onClick={() => setServiceTab(2)}>Learning</button>
          <button className={`p-4 hover:bg-[#154047] text-lg ${serviceTab === 3 ? "bg-[#154047]" : ""}`} onClick={() => setServiceTab(3)}>Technologies</button>
        </div>

        <div className="grid grid-cols-4 gap-5 my-8 w-full max-w-[50%]">
          {
            serviceTab === 1 ? (
              <>
                <TabCard img="https://ncarb.github.io/bootstrap/assets/img/bootstrap-stack.png" title="Bootstrap" />

                <TabCard img="https://shadowblood.gallerycdn.vsassets.io/extensions/shadowblood/tailwind-moon/3.0.2/1673948732518/Microsoft.VisualStudio.Services.Icons.Default" title="Tailwind" />

                <TabCard img="https://cdn3d.iconscout.com/3d/free/thumb/free-react-native-3d-logo-download-in-png-blend-fbx-gltf-file-formats--software-social-media-pack-logos-4642743.png?f=webp" title="React" />

                <TabCard img="https://static-00.iconduck.com/assets.00/redux-icon-2048x1945-ahvhunxp.png" title="Redux" />

                <TabCard img="https://img.icons8.com/nolan/512/express-js.png" title="Express js" />

                <TabCard img="https://img.icons8.com/?size=512&id=74402&format=png" title="MongDB" />
              </>

            ) :

              serviceTab === 2 ? (
                <>
                  <TabCard img="https://testrigor.com/wp-content/uploads/2023/04/nextjs-logo-square.png" title="Nextjs" />
                  <TabCard img="https://static-00.iconduck.com/assets.00/typescript-icon-256x256-23gcxynp.png" title="Typescript" />
                  <TabCard img="https://pngimg.com/uploads/mysql/mysql_PNG35.png" title="My SQL" />
                </>
              ) : serviceTab === 3 ? (
                <>
                  
                </>
              ) : <></>
          }
        </div>

      </div>

      <div className="grid grid-cols-2 my-[30vh]">
        <section className="flex flex-col justify-center items-center">
          <div>
            <img src={aboutMe} alt="" className="max-h-[500px] rounded-2xl" />
          </div>
        </section>
        <section className="flex items-center ">
          {/* About Me Text */}
          <div className="text-center md:text-left max-w-[60%]">
            <h2 className="text-3xl font-bold text-[#03191d]">About Me</h2>
            <p className="mt-4 tracking-wide leading-relaxed">
              Hi, I’m a passionate <span className="text-[#03191d] font-semibold">MERN stack developer </span>
              specializing in building scalable and interactive web applications.
              With <span className="text-[#03191d] font-semibold">6+ months</span> of hands-on experience, I work with
              <span className="text-[#03191d] font-semibold"> React, Node.js, Express, and MongoDB</span> to create efficient solutions.
            </p>
            <p className="mt-3 tracking-wide">
              I enjoy working on real-time applications, integrating Socket.io for chats, and using
              Redux Query for seamless state management. Currently, I’m looking for an
              <span className="text-[#03191d] font-semibold"> entry-level web developer role</span> where I can grow and contribute.
            </p>
            <a
              href="#"
              className="mt-5 inline-block bg-[#03191d] hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
            >
              Let&apos;s Connect 🚀
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
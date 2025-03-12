
import "./app.css";
import img from "./assets/IMG_34612.png"
import aboutMe from "./assets/DALL.webp"
import TabCard from "./TabCard";
import img1 from "../src/assets/Screenshot-2023-08-26-200121.png";
import img2 from "../src/assets/Screenshot-2023-08-26-200146.png";
import img3 from "../src/assets/Screenshot-2023-08-26-200204.png";
import img4 from "../src/assets/Screenshot-2023-08-26-200221.png";
import img5 from "../src/assets/Screenshot-2023-08-26-200236.png";
import img6 from "../src/assets/Screenshot-2023-08-26-200328.png";
import { motion } from "framer-motion"
import ProjectTabCard from "./ProjectTabCard";


function App() {
  return (
    <>
      <nav className="flex justify-between items-center py-5 px-32 bg-[#03191d]">
        <h1 className="text-2xl font-semibold">Najmus Sakib</h1>
        <div className="flex items-center gap-8">
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">About Me</button>
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">Services</button>
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">Projects</button>
          <button className="font-semibold hover:text-teal-500 p-1 border-b-4 rounded-lg border-transparent hover:border-teal-500">Contact Me</button>
        </div>
      </nav>
      <div
      // className="s-container"
      >
        {/* <svg className="s-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0,25 C25,70 75,-30 100,20 V40 H0 Z" fill="white" />
        </svg> */}

        <div className="text-white grid grid-cols-2 gap-10 items-center h-full">
          <motion.div
            initial={{
              x: -200,
              opacity: 0
            }}
            animate={{
              x: 50,
              opacity: "100%"
            }}
            transition={{
              duration: 2,
            }}

            className="px-16 flex flex-col items-center gap-2">
            <div className="max-w-[70%]">
              <p className="pb-10">Web Developer</p>
              <p className="tracking-wide">To excel as a Web Developer in an innovative environment
                that fosters learning and growth. I aim to leverage my technical skills and
                passion for creating exceptional web applications to drive user-centered design
                and contribute to the success of projects that push the boundaries of digital experiences.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{
              x: 200,
              opacity: 0
            }}
            animate={{
              x: -50,
              opacity: "100%"
            }}
            transition={{
              duration: 2,
            }}
            className="">
            <div className="flex justify-center">
              <div className="">
                <img src={img} alt="avatar" className="max-h-[600px] rounded-lg " />
              </div>
            </div>
          </motion.div>
        </div>
      </div >

      <div className="flex flex-col items-center justify-center mt-[30vh]">

        <h1 className="text-5xl border-b-2 border-purple-500">Skills & Tools</h1>
        <motion.div
          variants={{
            hidden: { opacity: 1, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-4 gap-5 my-8 w-full max-w-[50%]">

          <TabCard img="https://ncarb.github.io/bootstrap/assets/img/bootstrap-stack.png" title="Bootstrap" />
          <TabCard img="https://shadowblood.gallerycdn.vsassets.io/extensions/shadowblood/tailwind-moon/3.0.2/1673948732518/Microsoft.VisualStudio.Services.Icons.Default" title="Tailwind" />
          <TabCard img="https://cdn3d.iconscout.com/3d/free/thumb/free-react-native-3d-logo-download-in-png-blend-fbx-gltf-file-formats--software-social-media-pack-logos-4642743.png?f=webp" title="React" />
          <TabCard img="https://static-00.iconduck.com/assets.00/redux-icon-2048x1945-ahvhunxp.png" title="Redux" />
          <TabCard img="https://img.icons8.com/nolan/512/express-js.png" title="Express js" />
          <TabCard img="https://img.icons8.com/?size=512&id=74402&format=png" title="MongDB" />

          <TabCard img="https://img.icons8.com/fluent-systems-regular/600/FFFFFF/nextjs.png" title="Next js" />
          <TabCard img="https://static-00.iconduck.com/assets.00/typescript-icon-256x256-23gcxynp.png" title="Typescript" />
          <TabCard img="https://pngimg.com/uploads/mysql/mysql_PNG35.png" title="My SQL" />
          <TabCard img="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/vscode.png" title="vs code" />
          <TabCard img="https://images.icon-icons.com/3766/PNG/512/figma_icon_231327.png" title="figma" />
          <TabCard img="https://cdn.dribbble.com/userupload/28046663/file/still-879bd5f88faa2c210d4013090939ae0e.png" title="frammer" />

        </motion.div>

      </div>

      <div className="grid grid-cols-2 my-[30vh]">
        <section

          className="flex flex-col justify-center items-center">
          <motion.div
            initial={{
              x: -100,
              opacity: 0
            }}
            animate={{
              x: 30,
              opacity: "100%"
            }}
            transition={{
              duration: 2,
            }}
          >
            <img src={aboutMe} alt="" className="max-h-[500px] rounded-2xl" />
          </motion.div>
        </section>

        <motion.section
          initial={{
            x: 200,
            opacity: 0
          }}
          animate={{
            x: 100,
            opacity: "100%"
          }}
          transition={{
            duration: 2,
          }}
          className="flex items-center ">
          {/* About Me Text */}
          <div className="text-center md:text-left max-w-[60%]">
            <h2 className="text-3xl font-bold text-cyan-500">About Me</h2>
            <p className="mt-4 tracking-wide leading-relaxed">
              Hi, I’m a passionate <span className="text-cyan-500 font-semibold">MERN stack developer </span>
              specializing in building scalable and interactive web applications.
              With <span className="text-cyan-500 font-semibold">6+ months</span> of hands-on experience, I work with
              <span className="text-cyan-500 font-semibold"> React, Node.js, Express, and MongoDB</span> to create efficient solutions.
            </p>
            <p className="mt-3 tracking-wide">
              I enjoy working on real-time applications, integrating Socket.io for chats, and using
              Redux Query for seamless state management. Currently, I’m looking for an
              <span className="text-cyan-500 font-semibold"> entry-level web developer role</span> where I can grow and contribute.
            </p>
            <a
              href="#"
              className="mt-5 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
            >
              Let&apos;s Connect 🚀
            </a>
          </div>
        </motion.section>
      </div>

      <div className="flex flex-col items-center justify-center p-10 mt-12">
        <p className="border-b-4 border-yellow-600 text-4xl mb-14">RECENT WORK</p>
        <motion.div
          variants={{
            hidden: { opacity: 1, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-10">

          <ProjectTabCard img={img6} title="Fighting Spirit" />
          <ProjectTabCard img={img5} title="Toy House" />
          <ProjectTabCard img={img4} title="Need Cookie" />
          <ProjectTabCard img={img3} title="Job Hunt" />
          <ProjectTabCard img={img2} title="knowledge cafe" />
          <ProjectTabCard img={img1} title="AI Universe Hub" />

        </motion.div>
      </div>

      <div className=" flex items-center justify-center min-h-screen">
        <form className="bg-white rounded-lg grid grid-cols-2 p-16 w-full max-w-[50%] gap-x-28">

          <div className="space-y-10">
            <p className="text-4xl mb-5 font-bold">Say Hello</p>
            <div><p>Full Name</p><input type="text" className="border-t rounded-md shadow-lg p-2 w-full" /></div>
            <div><p>Phone Number</p><input type="text" className="border-t rounded-md shadow-lg p-2 w-full" /></div>
            <div><p>Email</p><input type="text" className="border-t rounded-md shadow-lg p-2 w-full" /></div>
          </div>
          <div>
            <div><p>Message</p><textarea className="border-t rounded-md shadow-lg p-4 w-full" /></div>
            <div className="mt-3"><input type="submit" className="border rounded-md p-4" /></div>
            <div className="bg-green-100 rounded-lg text-green-500 font-semibold">
              <p></p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
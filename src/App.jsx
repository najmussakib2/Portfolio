import "./app.css";
import img from "./assets/IMG.png"

function App() {
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
          <div className=" z-10">
            <img src={img} alt="avatar" className="rounded-full border z-10 " />
          </div>
        </div>
      </div>

    </>
  );
}

export default App;

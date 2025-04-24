import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiExpress, SiRedux, SiFirebase, SiSocketdotio, SiTailwindcss } from 'react-icons/si';

const About = () => {
  const technologies = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'MongoDB', icon: <FaDatabase /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'Redux', icon: <SiRedux /> },
    { name: 'Firebase', icon: <SiFirebase /> },
    { name: 'Socket.io', icon: <SiSocketdotio /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="section">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:w-1/3 mb-12 md:mb-0">
            <motion.h2 className="section-title" variants={itemVariants}>
              About Me
            </motion.h2>
          </div>

          <div className="md:w-2/3">
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-text-light mb-4">
                Hello! I&apos;m Najmus Sakib, a dedicated MERN stack developer with expertise in building 
                full-stack web applications. My journey in web development started with a passion for 
                creating digital solutions to real-world problems.
              </p>
              <p className="text-text-light mb-4">
                I&apos;ve built several practical applications including a Courier Service website, Order Management 
                System, Martial Art School platform, Toy House e-commerce site, and an Online Cooking and 
                Ordering platform. Each project has helped me grow my skills in both frontend and backend 
                development.
              </p>
              <p className="text-text-light">
                Here are the core technologies I work with:
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-text-light hover:text-accent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-accent mr-2">{tech.icon}</span>
                  {tech.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
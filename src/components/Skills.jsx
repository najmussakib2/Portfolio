import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaBootstrap, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiNextdotjs, SiRedux, SiTailwindcss, SiMongodb, SiExpress, SiFirebase, SiSocketdotio, SiMaterialdesign, SiMysql } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
    { name: 'CSS3', icon: <FaCss3Alt />, level: 90 },
    { name: 'JavaScript', icon: <SiJavascript />, level: 90 },
    { name: 'React', icon: <FaReact />, level: 90 },
    { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
    { name: 'Express.js', icon: <SiExpress />, level: 85 },
    { name: 'MongoDB', icon: <SiMongodb />, level: 85 },
    { name: 'Bootstrap', icon: <FaBootstrap />, level: 60 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 85 },
    { name: 'Redux', icon: <SiRedux />, level: 85 },
    { name: 'Firebase', icon: <SiFirebase />, level: 75 },
    { name: 'Git/GitHub', icon: <FaGithub />, level: 85 },
    { name: 'Socket.io', icon: <SiSocketdotio />, level: 45 },
    { name: 'Next.js', icon: <SiNextdotjs />, level: 20 },
    { name: 'TypeScript', icon: <SiTypescript />, level: 30 },
    { name: 'Material UI', icon: <SiMaterialdesign />, level: 20 },
    { name: 'MySQL', icon: <SiMysql />, level: 10 },
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
    <section id="skills" className="section">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:w-1/3 mb-12 md:mb-0">
            <motion.h2 className="section-title" variants={itemVariants}>
              Skills & Expertise
            </motion.h2>
          </div>

          <div className="md:w-2/3">
            <motion.p variants={itemVariants} className="text-text-light mb-12">
              I&apos;ve worked with a variety of technologies in the web development
              world. From front-end to back-end, I&apos;m always eager to learn new
              technologies and frameworks to build amazing applications.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-accent mr-2 text-xl">
                        {skill.icon}
                      </span>
                      <span className="text-light">{skill.name}</span>
                    </div>
                    <span className="text-text">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-tertiary rounded-full h-2.5">
                    <motion.div
                      className="bg-accent h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + index * 0.1,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
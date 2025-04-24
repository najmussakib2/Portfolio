import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { BsArrowDown } from 'react-icons/bs';
import photo from '../assets/images/IMG_34612.png'

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/najmussakib2' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/najmussakib2' },
    { icon: <HiOutlineMail />, url: 'mailto:nnsnajmussakib@gmail.com' },
    { icon: <FiPhone />, url: 'tel:+8801864742013' },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="home" className="section">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.p variants={itemVariants} className="text-accent text-lg mb-4">
              Hi, my name is
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-light mb-4">
              Najmus Sakib.
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-text mb-6">
              I build web applications with MERN stack.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-text-light mb-8 max-w-lg">
              I&apos;m a passionate MERN stack developer specializing in building robust, 
              scalable web applications. I&apos;ve created multiple projects including 
              e-commerce platforms, management systems, and service websites.
            </motion.p>
            <motion.div variants={itemVariants}>
              <a href="#projects" className="btn inline-flex items-center">
                View My Projects <BsArrowDown className="ml-2" />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent opacity-10 absolute -top-6 -left-6"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent opacity-10 absolute -bottom-6 -right-6"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent">
                {/* Replace with your image */}
                <div className="w-full h-full bg-tertiary flex items-center justify-center text-light">
                  <img src={photo} alt="My Photo" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="fixed left-8 bottom-0 hidden md:flex flex-col items-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light hover:text-accent text-xl transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
          <div className="w-px h-24 bg-light"></div>
        </motion.div>

        <motion.div
          className="fixed right-8 bottom-8 hidden md:flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <a
            href="#about"
            className="text-light hover:text-accent transition-colors rotate-90 mb-24"
          >
            <span className="tracking-wider">Scroll Down</span>
          </a>
          <div className="w-px h-24 bg-light"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
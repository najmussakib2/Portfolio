import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' },
    { name: 'Contact', url: '#contact' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/najmussakib2' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/najmussakib2' },
    { icon: <HiOutlineMail />, url: 'nnsnajmussakib@gmail.com' },
    { icon: <FiPhone />, url: 'tel:+8801864742013' },
  ];


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-secondary py-2 shadow-lg' : 'bg-primary py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="/"
          className="text-accent text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          {'<NajmusSakib />'}
        </motion.a>

        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={link.url}
                  className="text-light hover:text-accent transition-colors"
                >
                  <span className="text-accent mr-1"></span>
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
        </nav>

        <button
          className="md:hidden text-light focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-secondary absolute top-full left-0 right-0 shadow-lg"
        >
          <div className="container mx-auto px-6 py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.url}
                    className="text-light hover:text-accent transition-colors block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-accent mr-1">0{index + 1}.</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="text-light hover:text-accent text-xl"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn block mt-6 text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Resume
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
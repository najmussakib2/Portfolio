// components/Footer.jsx
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 text-center text-text"
    >
      <div className="container mx-auto px-6">
        <p className="text-sm">
          Designed & Built with <FaHeart className="inline text-accent" /> by Najmus Sakib
        </p>
        <p className="text-xs mt-2">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
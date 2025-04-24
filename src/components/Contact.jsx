// components/Contact.jsx
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        'service_7y0gpoh',
        'template_4g1o9wy',
        form.current,
        'AAhTsXdlfS1zF3HzQ'
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.log(error.text);
          setSubmitStatus('error');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/najmussakib2' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/najmussakib2' },
    { icon: <FiTwitter />, },
    { icon: <HiOutlineMail />, url: 'nnsnajmussakib@gmail.com' },
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
    <section id="contact" className="section">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:w-1/3 mb-12 md:mb-0">
            <motion.h2 className="section-title" variants={itemVariants}>
              Get In Touch
            </motion.h2>
          </div>

          <div className="md:w-2/3">
            <motion.p
              variants={itemVariants}
              className="text-text-light mb-12"
            >
              Although I&apos;m not currently looking for any new opportunities, my
              inbox is always open. Whether you have a question or just want to
              say hi, I&apos;ll try my best to get back to you!
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="bg-secondary rounded-lg p-8 shadow-lg"
            >
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded mb-6"
                >
                  Thank you for your message! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6"
                >
                  Oops! Something went wrong. Please try again later.
                </motion.div>
              )}

              <form ref={form} onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-light mb-2 text-sm"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-tertiary border border-tertiary focus:border-accent rounded-lg px-4 py-3 text-light focus:outline-none transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-light mb-2 text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-tertiary border border-tertiary focus:border-accent rounded-lg px-4 py-3 text-light focus:outline-none transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-light mb-2 text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-tertiary border border-tertiary focus:border-accent rounded-lg px-4 py-3 text-light focus:outline-none transition-colors"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="btn inline-flex items-center"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <FiSend className="ml-2" />
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center space-x-6"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover:text-accent text-2xl transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
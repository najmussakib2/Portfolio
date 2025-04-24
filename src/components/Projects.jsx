import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

import image1 from '../assets/images/Screenshot_1.png'
import image2 from '../assets/images/Screenshot_2.png'
import image3 from '../assets/images/Screenshot-2023-08-26-200328.png'
import image4 from '../assets/images/Screenshot-2023-08-26-200236.png'
import image5 from '../assets/images/Screenshot-2023-08-26-200221.png'

const Projects = () => {
    const projects = [

        {
            title: 'Order Management System',
            description: `Introducing Orbit Graphics: A full-stack Order, Client & Task managment website.
● authentication: Only users can visit the dashboard.Others will see Login page.
●.authorization: This is a permission based authorization app.so admin can add or revoke permissions for
particular users.
● Chating system: i have implemented a real time chat system here using socket.io where chat notifications
stored in DB.
● every orders and tasks has a countdown and count up system where shows the remaining time of submission
and how much time expended.
● users can see active or inactive users by indicator.`,
            tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Tailwind CSS', 'Socket.io', 'Redux', 'Redux Persist', 'bcrypt',
                'multer', 'cloudinary', 'zod', 'nodemailer'],
            live: 'https://orbitgraphics.org/login',
            image: image2
        },
        {
            title: 'Courier Service Website',
            description: `Introducing DeliDrop: A full-stack courier service website.
● authentication: Only users can visit the dashboard. Others will see Home Page page.
●. authorization: This is a Role-based authorization app. so the admin can create Admin, merchant, and
moderator.
● users can create parcels there will be calculations based on parcel weight, delivery area and
cash collection amount.
● users can create shops and create parcels based on the shop.`,
            tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'MongoDB', 'JWT', 'Redux', 'Redux Persist', 'bcrypt',
                'multer', 'cloudinary', 'zod'],
            live: 'https://delidrop.com.bd',
            image: image1
        },
        {
            title: 'Martial Art School Website',
            description: `Introducing Fighting Spirit: A full-stack martial art academy website.
● Implemented authentication & authorization: Only users can visit the dashboard. Students, and instructors &
admin each have a dedicated dashboard based on their role.
● Students can see their selected classes and can pay online. Instructors can add classes and see the added
classes.
● Admin can see all the users and switch between admin and instructors.`,
            tags: ['React', 'Tailwind CSS', 'Firebase', 'MongoDB', 'Node Js', 'Express Js', 'JWT', 'Stripe'],
            githubClient: 'https://github.com/najmussakib2/Fighting-Spirit-client',
            githubServer: 'https://github.com/najmussakib2/Fighting-Spirit-Server',
            live: 'https://assignment12-f2b70.web.app',
            image: image3
        },
        {
            title: 'Toy House E-commerce',
            description: `Introducing Fighting Spirit: A full-stack martial art academy website.
● Implemented authentication & authorization: Only users can visit the dashboard. Students, and instructors &
admin each have a dedicated dashboard based on their role.
● Students can see their selected classes and can pay online. Instructors can add classes and see the added
classes.
● Admin can see all the users and switch between admin and instructors.`,
            tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Tailwind CSS', 'Firebase',],
            githubClient: 'https://github.com/najmussakib2/Toy-House-Client/tree/main',
            githubServer: 'https://github.com/najmussakib2/Toy-House-Server',
            live: 'https://thunderous-kashata-5b5b55.netlify.app',
            image: image4
        },
        {
            title: 'Online Cooking & Ordering',
            description: `Platform for ordering foods and choose Cook/Chef, also where Cook/Chef's can create account and sell there own dishes.
            ● Has a newsletter section to get new recipes.
● Payment system.
● Has a collapsible menu for mobile devices`,
            tags: ['React', 'Tailwind', 'Firebase', 'Node Js', 'Express', 'Vercel'],
            githubClient: 'https://github.com/najmussakib2/Need-Cookie-client',
            githubServer: 'https://github.com/najmussakib2/Need-Cookie-server',
            live: 'https://fantastic-peony-a9d2c4.netlify.app',
            image: image5
        },
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
        <section id="projects" className="section">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 className="section-title mb-16" variants={itemVariants}>
                        My Projects
                    </motion.h2>

                    <div className="space-y-24">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } items-center gap-8`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="md:w-1/2 relative group">
                                    <div className="absolute inset-0 bg-accent opacity-20 rounded-lg group-hover:opacity-0 transition-opacity"></div>
                                    <div className="absolute inset-0 border-2 border-accent rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
                                    <div className="relative bg-tertiary rounded-lg overflow-hidden h-64">
                                        {/* Replace with your project image */}
                                        <img src={project.image} alt="project image" />
                                    </div>
                                </div>

                                <div className="md:w-1/2 relative z-10">
                                    <h3 className="text-light text-2xl mb-2">{project.title}</h3>
                                    <p className="text-text-light bg-secondary p-6 rounded-lg mb-4 shadow-lg">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="text-xs text-accent bg-tertiary px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex space-x-4">
                                        {project.githubClient&&<a
                                            href={project.githubClient}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-light hover:text-accent transition-colors"
                                        >
                                            <div className='flex gap-1 text-xs items-center'><FiGithub size={20} /> <p>client</p></div>
                                        </a>}
                                        {project.githubServer&&<a
                                            href={project.githubServer}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-light hover:text-accent transition-colors"
                                        >
                                            <div className='flex gap-1 text-xs items-center'><FiGithub size={20} /> <p>server</p></div>
                                        </a>}
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-light hover:text-accent transition-colors"
                                        >
                                            <FiExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
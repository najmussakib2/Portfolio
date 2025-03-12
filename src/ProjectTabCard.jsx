/* eslint-disable react/prop-types */
import { motion } from "framer-motion"

const ProjectTabCard = ({ img, title, details = "details" }) => {
    return (
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1
                }
            }}
            className="flex flex-col items-center justify-center gap-6 rounded-xl shadow-xl p-5">
            <img src={img} alt="" className="rounded-lg" />
            <p className="text-2xl">{title}</p>
            <p>{details}</p>
        </motion.div>
    );
};

export default ProjectTabCard;
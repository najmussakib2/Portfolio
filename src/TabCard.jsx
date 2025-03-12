/* eslint-disable react/prop-types */
import { motion } from "framer-motion"

const TabCard = ({ img, title }) => {

    return (
        <motion.div
        variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1
                }
            }}
            className="flex flex-col justify-center mb-10">
            <div className="flex justify-center">
                <img src={img} className="h-24" alt="image" />
            </div>
            <p className="text-center">{title}</p>
        </motion.div>
    )
}

export default TabCard;
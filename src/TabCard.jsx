/* eslint-disable react/prop-types */


const TabCard = ({ img, title }) => {

    return (
        <div className="flex flex-col justify-center mb-10">
            <div className="flex justify-center">
                <img src={img} className="h-24" alt="image" />
            </div>
            <p className="text-center">{title}</p>
        </div>
    )
}

export default TabCard;
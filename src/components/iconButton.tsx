import { ReactNode } from "react";

interface IIconButton {
    icon : ReactNode
}

const IconButton = ({icon} : IIconButton) => {
    return(
        <button className="hover:text-red-700">
            {icon}
        </button>
    )
}

export default IconButton
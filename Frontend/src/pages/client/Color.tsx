import { useColor } from "../../hook/Color"


type Props = {}

const Color = (props: Props) => {
    const { getColor, color, size } = useColor()
    return (
        <>
            {color.map((color,index)=>{
                return(
                    <div key={index}>
                        {color.name}
                        {color.color_code}
                    </div>
                )
            })}            
           <div>
                {size.map((size, index)=>{
                    return(
                        <div key={index}>
                            {size.name}
                        </div>
                    )
                })} 
            </div> 
        </>
    )
}

export default Color
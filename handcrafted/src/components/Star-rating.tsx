import { useState } from "react"
import { FaStar } from "react-icons/fa"

export function StarRating() {
    
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    // const [rating, setRating] = useState(()=>{
    //     const savedRatings = typeof window !== 'undefined' && localStorage.getItem('rating');
    //     if (savedRatings == null) return[]
    //     return JSON.parse(savedRatings)
    //   })

    //   useEffect(() => {
    //     localStorage.setItem("rating", JSON.stringify(rating))
    //   }, [rating])

    // const [hover, setHover] = useState(()=>{
    //     const savedHover = typeof window !== 'undefined' && localStorage.getItem('hover');
    //     if (savedHover == null) return[]
    //     return JSON.parse(savedHover)
    // })

    // useEffect(() => {
    //     localStorage.setItem("hover", JSON.stringify(hover))
    //   }, [hover])

    // setRating.localStorage.setItem("currentState", JSON.stringify(rating))
    // let savedState = JSON.parse(localStorage.getItem("currentState"))

    return(
        <div className="block p-4">
            {[...Array(5)].map((star, index) => {
                const currentState = index + 1
                
                

                return(
                    <>
                        <label>
                            <input type="radio" name="rate"
                             className="hidden" 
                            value={currentState} 
                            onClick={() => setRating(currentState)}
                            />
                            <FaStar 
                            size={20} 
                            className=" inline cursor-pointer"
                            color={currentState <= (hover || rating) ? "#71797E" : "#e4e5e9"} 
                            onMouseEnter = {() => setHover(currentState)}
                            onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    </>
                )
            })}
            <p className="inline"> {rating} reviews</p>
        </div>
    )
}
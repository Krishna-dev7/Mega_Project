"use client"

import { StarIcon } from "lucide-react"
import { useId } from "react";


function Review() {

    const id = useId();
  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis auctor nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis." 
    },
    {
      name: "Jane Doe",
      rating: 4,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis auctor nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis."
    },
    {
      name: "Jane Doe",
      rating: 4,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis auctor nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis."
    },
    {
      name: "Jane Doe",
      rating: 4,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis auctor nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis."
    },
    {
      name: "Jane Doe",
      rating: 4,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis auctor nunc. Sed auctor nunc quis nisi gravida, non tincidunt nunc varius. Integer auctor, dui nec vehicula lacinia, mi mi ultricies ex, a feugiat nunc turpis."
    },
  ]

  return <div 
    className="w-full lg-flex bg-[#e7e4c4] justify-center items-center ">
      {/* divide the section into left and right */}
      <div className="left w-2/3 px-10 " >
        {/* Review Section */}
        { reviews.map( review => (
            <div key={review.name} className="flex flex-col items-start text-lg gap-5 justify-between mb-20">
              <h3>{review.name}</h3>
                <div className="flex space-x-2">
                  { Array(review.rating).fill(0).map( () => (
                    <StarIcon key={id} />
                  )) } 
                </div>
                <p> {review.comment} </p>
            </div>
        )) }
      </div>

      <div className="right w-full " >

      </div>
  </div>
}

export default Review;
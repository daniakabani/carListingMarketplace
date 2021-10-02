import React, { useEffect, useState } from "react";
import { getCarByID } from "../../services/cars";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CarView = () => {
  const [state, setState] = useState({
    isLoading: true,
    data: null
  });
  const { isLoading, data } = state;
  let { id: carID } = useParams();

  useEffect(() => {
    getCarByID(carID)
      .then(result => {
        let car = {
          id: result?.id,
          brand: result?.brand,
          created_at: new Date(result?.created_at)?.toString() ?? "N/A",
          model: result?.model,
          price: result?.day_price,
          owner: result?.user?.username,
          year: result?.year,
          lat: result?.geo_location?.lat,
          lng:result?.geo_location?.lng,
          user_id: result?.user?.id
        }
        setState({
          ...state,
          isLoading: false,
          data: car
        });
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <div id="main">
      <div className="content">
        <header>
          <h1>{isLoading ? "Loading..." : "Car details"}</h1>
        </header>
        <div className="view-data">
          <ul>
            <li><span>ID:</span>{data?.id}</li>
            <li><span>brand:</span>{data?.brand}</li>
            <li><span>Model:</span>{data?.model}</li>
            <li><span>Price:</span>{data?.price}RM</li>
            <li><span>Owner:</span><Link to={`/users/${data?.user_id}`}>{data?.owner}</Link></li>
            <li><span>Year:</span>{data?.year}</li>
            <li><span>Lat:</span>{data?.lat}</li>
            <li><span>Lng:</span>{data?.lng}</li>
            <li><span>Join Date:</span>{data?.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CarView;
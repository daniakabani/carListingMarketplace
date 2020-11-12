import React, { useEffect, useContext, useState } from "react";
import context from "../../providers/context";
import InputField from "../../components/inputField";
import { editCar, getCarByID } from "../../services/cars";
import Button from "../../components/button";
import { FormSerializer } from "../../helpers";
import { useHistory, useParams } from "react-router-dom";
import Toggle from "react-toggle";

const CarEdit = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const { id: carID } = useParams();
  const [state, setState] = useState({
    carInfo: null,
    featured: false
  });
  const { carInfo, featured } = state;

  const handleFormSubmit = e => {
    e.preventDefault();
    const { brand, model, year, price, lat, lng } = FormSerializer(e.currentTarget);
    editCar({
      id: Number(carID),
      body: {
        brand,
        model,
        year,
        day_price: price,
        geo_location: {
          lat,
          lng
        },
        featured
      }
    })
      .then(() => {
        history.push(`/cars/${carID}`);
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    getCarByID(carID)
      .then(({ model, brand, year, day_price, geo_location, featured }) => {
        setState({
          ...state,
          carInfo: {
            brand,
            model,
            year,
            price: day_price,
            location: geo_location
          },
          featured
        })
      })
      .catch(e => console.error(e));
  }, []);

  const handleToggles = value => {
    setState({
      ...state,
      featured: value
    })
  }

  if (role === "super_user") {
    return (
      <div id="main">
        <div className="form-wrapper">
          <h1>Update Car Info</h1>
          <form onSubmit={e => handleFormSubmit(e)}>
            <InputField name="brand" defaultValue={carInfo?.brand} placeHolder="Your Car Brand"/>
            <InputField name="model" defaultValue={carInfo?.model} placeHolder="Your Car Model"/>
            <InputField name="year" defaultValue={carInfo?.year} placeHolder="Built Year"/>
            <InputField name="price" defaultValue={carInfo?.price} placeHolder="Day Price"/>
            <InputField name="lat" defaultValue={carInfo?.location?.lat} placeHolder="Car Lat"/>
            <InputField name="lng" defaultValue={carInfo?.location?.lng} placeHolder="Car lng"/>
            <h5>Featured</h5>
            <Toggle
              checked={featured}
              onChange={e => handleToggles(e.target.checked)}
            />
            <Button content="Update"/>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>Access Denied.</h1>
          </header>
        </div>
      </div>
    )
  }
}

export default CarEdit;
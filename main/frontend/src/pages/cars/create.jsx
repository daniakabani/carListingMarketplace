import React, { useEffect, useContext, useState } from "react";
import context from "../../providers/context";
import InputField from "../../components/inputField";
import { getAllUsers } from "../../services/users";
import { createCar } from "../../services/cars";
import Button from "../../components/button";
import { FormSerializer } from "../../helpers";
import { useHistory } from "react-router-dom"
import Select from "react-select";

const CarCreate = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const [state, setState] = useState({
    users: null,
    selectedUser: null
  });
  const { users, selectedUser } = state;

  const handleFormSubmit = e => {
    e.preventDefault();
    const { brand, model, year, price, lat, lng } = FormSerializer(e.currentTarget);
    createCar({
      brand,
      model,
      year,
      day_price: price,
      geo_location: {
        lat,
        lng
      },
      user_id: selectedUser
    })
      .then(() => {
        history.push('/cars');
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    getAllUsers({ users: true, page_size: 50 })
      .then(response => {
        let tmpUsersArray = [];
        response?.results?.map(user => {
          return tmpUsersArray.push({
            label: `${user?.id}- ${user?.username}`,
            value: user?.id
          })
        })
        setState({
          ...state,
          users: tmpUsersArray
        })
      })
      .catch(e => console.error(e));
  }, []);

  const handleUsersSelect = (e) => {
    setState({
      ...state,
      selectedUser: Number(e.value)
    })
  }

  if (role === "super_user") {
    return (
      <div id="main">
        <div className="form-wrapper">
          <h1>Register a new Car</h1>
          <form onSubmit={e => handleFormSubmit(e)}>
            <InputField name="brand" placeHolder="Your Car Brand" required/>
            <InputField name="model" placeHolder="Your Car Model" required/>
            <InputField name="year" placeHolder="Built Year" />
            <InputField name="price" placeHolder="Day Price" required/>
            <InputField name="lat" placeHolder="Car Lat" required/>
            <InputField name="lng" placeHolder="Car lng" required/>
            <Select
              placeholder="Owner"
              options={users ?? []}
              onChange={e => handleUsersSelect(e)}
              className="select"
            />
            <Button content="Create"/>
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

export default CarCreate;
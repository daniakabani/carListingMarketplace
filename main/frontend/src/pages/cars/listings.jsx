import React, { useEffect, useContext, useState } from "react";
import { getAllCars } from "../../services/cars";
import { useHistory, Link } from "react-router-dom";
import context from "../../providers/context";
import Button from "../../components/button";
import ReactPaginate from "react-paginate";
import InputField from "../../components/inputField";

let searchTimeOut;
const CarList = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    currentPage: 1,
    pageCount: 1,
    brandFilter: ''
  });
  const { isLoading, data, currentPage, pageCount, brandFilter } = state;
  useEffect(() => {
    setState({
      ...state,
      data: null
    });
    getAllCars(brandFilter, currentPage)
      .then(response => {
        setState({
          ...state,
          data: response?.results,
          isLoading: false,
          pageCount: response?.page_count
        })
      })
      .catch(e => {
        console.error(e);
      })
  }, [currentPage, brandFilter]);

  const handleRedirects = location => {
    history.push(`/${location}`);
  }

  const handlePageChange = page => {
    let pageNumber = Number(page + 1);
    if (pageNumber <= pageCount) {
      setState({
        ...state,
        currentPage: pageNumber
      })
    }
  }

  const handleSearch = name => {
    if (searchTimeOut) {
      clearTimeout(searchTimeOut);
    }
    searchTimeOut = setTimeout(() => {
      !isLoading &&
      setState({
        ...state,
        brandFilter: name,
        isLoading: true
      });
    }, 400);
  };

  return (
    <div id="main">
      <div className="content">
        <header>
          <h1>Available Cars</h1>
          {role === "super_user" && <Link to='/cars/new'>Register a new car</Link>}
        </header>
        <div className="filters">
          <h3>Filters</h3>
          <div className="actions">
            <InputField placeHolder="search for a name" name="username" onChange={e => handleSearch(e?.target?.value)}/>
          </div>
        </div>
        <div className="list-view">
          {isLoading ? <h1>Loading...</h1> :
            (<ul className="api-data">
              {data?.map((item, key) => (
                <li key={key}>
                  <h2>{item?.brand}</h2>
                  <h3>{item?.model}</h3>
                  {item?.featured && (
                    <div className="featured">
                      Featured
                    </div>
                  )}
                  <div className="actions">
                    <Button onClick={() => handleRedirects(`cars/${item?.id}`)} success content="view"/>
                    {role === "super_user" && <Button onClick={() => handleRedirects(`cars/${item?.id}/edit`)} warning content="edit"/>}
                    {role === "super_user" && <Button danger content="delete"/>}
                  </div>
                </li>
              ))}
            </ul>)
          }
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={10}
            activeClassName={'active'}
            containerClassName="pagination"
            onPageChange={({ selected }) => handlePageChange(selected)}
          />
        </div>
      </div>
    </div>
  )
}

export default CarList;
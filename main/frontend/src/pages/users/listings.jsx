import React, { useEffect, useContext, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useHistory, Link } from "react-router-dom";
import context from "../../providers/context";
import Button from "../../components/button";
import ReactPaginate from "react-paginate";
import InputField from "../../components/inputField";

let searchTimeOut;
const UsersList = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    currentPage: 1,
    pageCount: 1,
    nameFilter: ''
  });
  const { isLoading, data, currentPage, pageCount, nameFilter } = state;
  useEffect(() => {
    setState({
      ...state,
      data: null
    });
    getAllUsers(nameFilter, currentPage)
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
  }, [currentPage, nameFilter]);

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
        nameFilter: name,
        isLoading: true
      });
    }, 400);
  };

  if (role === "super_user") {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>Available Users</h1>
            <Link to='/users/new'>Create new user</Link>
          </header>
          <div className="filters">
            <h3>Filters</h3>
            <InputField placeHolder="search for a name" name="username" onChange={e => handleSearch(e?.target?.value)}/>
          </div>
          <div className="list-view">
            {isLoading ? <h1>Loading...</h1> :
              (<ul className="api-data">
                {data?.map((item, key) => (
                  <li key={key}>
                    <h2>{item?.username}</h2>
                    <h3><span>Role:</span> {item?.role?.name}</h3>
                    <div className="actions">
                      <Button onClick={() => handleRedirects(`users/${item?.id}`)} success content="view"/>
                      <Button onClick={() => handleRedirects(`users/${item?.id}/edit`)} warning content="edit"/>
                      <Button danger content="delete"/>
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
  } else {
    return (
      <div id="main">
        <div className="content">
          <div className="list-view">
            <h1>Access denied.</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default UsersList;
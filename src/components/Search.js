import React, { useState } from 'react'

export default function Search(props) {

  const [state, setState] = useState({
    search: "",
    message: "",
  });

  const handleOnChange = (e) => {
    setState(
      {
        [e.target.name]: e.target.value,
        message: "",
      }
    )
  };

  const handleOnClick = () => {
    if (state.search !== "" && state.search !== undefined) {
      console.log(21);
      props.fetchMovieData(state.search)
    } else {
      setState({
        message: "Please enter a movie"
      })
    }
  }

  return (
    <div className="Search__Section">
      <input
        name="search"
        value={state.search}
        onChange={handleOnChange}
      />
      <button onClick={handleOnClick}>Search</button>
      <br />
      <div style={{ height: "1px" }}>
        {props.message}
        {state.message}
      </div>
    </div>
  )
}

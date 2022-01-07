import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singleCharacter.css";

function SingleCharater(props) {
  const { characterNo } = props;
  const [details, setDetails] = useState(null);
  // const [no, setNo] = useState(null);

  useEffect(() => {
    try {
      async function getcharacter(character) {
        let response = await axios.get(
          `https://rickandmortyapi.com/api/character/${character}`
        );
        console.log(response.data);
        setDetails(response.data);
      }

      getcharacter(characterNo);
    } catch (err) {
      console.log(err.request);
      return err.request;
    }
  }, [characterNo]);

  // const handleNo = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   setNo(e.target.value);
  // };

  const getEpisode = (e) => {
    e.preventDefault();
    axios
      .get(`https://rickandmortyapi.com/api/episode/${e.target.value}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.request.response);
      });
  };

  return (
    <>
      <div>
        {details && (
          <>
            <div className="container">
              <button
                onClick={(e) => {
                  props.onHandleDetails(e, null, "close");
                }}
              >
                XXX
              </button>

              <input
                name="episode"
                onChange={(e) => {
                  getEpisode(e);
                }}
              />
              <h1>{details.name}</h1>
              <img src={details.image} alt="character" />
              <span>
                Status : {details.status}
                <br />
                Species : {details.species}
                <br />
                Gender : {details.gender}
                Orign : {details.origin.name}
                <br />
                Episode :
                {details.episode.map((ele, index) => (
                  <div key={index}>
                    Appeared Episode : EP{ele.replace(/[^0-9]/g, "")}
                  </div>
                ))}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SingleCharater;

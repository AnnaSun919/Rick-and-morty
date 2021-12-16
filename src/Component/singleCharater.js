import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singleCharacter.css";

function SingleCharater(props) {
  const { characterNo } = props;
  const [details, setDetails] = useState(null);
  // const [episode, setEpisode] = useState(null);

  useEffect(() => {
    try {
      async function getcharacter(character) {
        let response = await axios.get(
          `https://rickandmortyapi.com/api/character/${character}`
        );
        console.log(response.data);
        setDetails(response.data);
      }

      // async function getEpisode() {
      //   let response = await axios.get(
      //     `https://rickandmortyapi.com/api/episode`
      //   );
      //   setEpisode(response.data);
      // }
      // getEpisode();
      getcharacter(characterNo);
    } catch (err) {
      console.log(err);
    }
  }, [characterNo]);

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

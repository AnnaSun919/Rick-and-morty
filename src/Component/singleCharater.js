import axios from "axios";
import React, { useEffect, useState } from "react";

function SingleCharater(props) {
  const { characterNo } = props;
  const [details, setDetails] = useState(null);
  // const [no, setNo] = useState(null);

  useEffect(() => {
    if (characterNo) {
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
        return err.request;
      }
    }
  }, [characterNo]);

  return (
    <>
      <div>
        {details && (
          <>
            <div className="box2">
              <h1>{details.name}</h1>
              <button
                onClick={(e) => {
                  props.onHandleDetails(e, null, "close");
                }}
              >
                X
              </button>
              <div className="info_box">
                <img src={details.image} alt="character" />
                <span>
                  Status : {details.status}
                  <br />
                  Species : {details.species}
                  <br />
                  Gender : {details.gender}
                  <br />
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
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SingleCharater;

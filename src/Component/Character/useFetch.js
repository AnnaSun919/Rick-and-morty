import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const useFetch = (serachItem, searchOther, date, APIpage) => {
  let [basic, setBasic] = useState({
    totalPage: "",
    totalCharacter: "",
    character: "",
  });
  //setting page , for url
  const [pageNoArr, setPageNoArr] = useState([]);
  const [findNothing, setfindNothing] = useState(null);

  useEffect(() => {
    setfindNothing(null);
    async function getcharacter() {
      let dataArray = [];

      let response = await axios.get(`${API_URL}/character/?page=${APIpage}`);

      if (serachItem) {
        if (searchOther) {
          let searchValue = serachItem["species"];
          let searchValue1 = serachItem["status"];
          let searchValue2 = serachItem["name"];
          try {
            response = await axios.get(
              `${API_URL}/character/?page=${APIpage}&status=${searchValue1}&species=${searchValue}&name=${searchValue2}`
            );
          } catch (err) {
            setfindNothing("No Character found");
          }

          if (date) {
            let test = [];
            let page = 1;
            let totalPage = response.data.info.pages;
            while (page <= totalPage) {
              response = await axios.get(
                `${API_URL}/character/?page=${page}&status=${searchValue1}&species=${searchValue}&name=${searchValue2}`
              );
              page++;

              test.push(
                response.data.results.filter((elem) => {
                  return (
                    serachItem["startDate"] <= elem.created &&
                    elem.created <= serachItem["endDate"]
                  );
                })
              );
            }

            dataArray = test.flat();
          }
        } else if (date) {
          let response = await axios.get(
            `${API_URL}/character/?page=${APIpage}`
          );

          let totalPage = response.data.info.pages;
          let i = 1;
          let test = [];

          while (totalPage >= i) {
            let responseData = await axios.get(
              `${API_URL}/character/?page=${i}`
            );
            i++;

            test.push(
              responseData.data.results.filter((elem) => {
                return (
                  serachItem["startDate"] <= elem.created &&
                  elem.created <= serachItem["endDate"]
                );
              })
            );
          }
          dataArray = test.flat();
        }
      }

      pageNo(response.data.info.count);
      setBasic({
        totalCharacter: response.data.info.count,
        character: response.data.results,
        totalPage: response.data.info.pages,
      });

      if (date) {
        if (dataArray.length === 0) {
          setfindNothing("Find no informaion");
        }

        setBasic({
          totalCharacter: dataArray.length,
          character: dataArray,
        });

        pageNo(dataArray.length);
      }
    }

    const pageNo = (totalCharacter) => {
      let totalPage = 0;
      totalCharacter % 10 === 0
        ? (totalPage = totalCharacter / 10)
        : (totalPage = totalCharacter / 10 + 1);

      const pageArr = [];
      for (let i = 1; i <= totalPage; i++) {
        pageArr.push(i);
      }

      setPageNoArr(pageArr);
    };

    getcharacter();
  }, [serachItem, APIpage, date, searchOther]);

  return { basic, pageNoArr, findNothing };
};

export default useFetch;

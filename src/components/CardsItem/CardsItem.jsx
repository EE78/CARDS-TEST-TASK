import React, { useState, useEffect } from "react";
import "./CardsItem.css";

const baseUrl = "http://contest.elecard.ru/frontend_data/";
const postsUrl = baseUrl + "/catalog.json";

const sortArr = [
  "food",
  "winter",
  "health",
  "animals",
  "places",
  "vehicle",
  "business",
];

const sortOptions = ["date", "category", "size"];

const CardsItem = () => {
  const [cardInfo, setCardInfo] = useState();

  useEffect(() => {
    const handleFetchData = async () => {
      const response = await fetch(postsUrl);
      const data = await response.json();
      setCardInfo(data);
    };
    handleFetchData();
  }, []);

  const [chooseSort, setChooseSort] = useState("");
  const handleChooseCategory = (e) => {
    const value = e.target.value;
    setChooseSort(value);
  };

  const [isClosed, setIsClosed] = useState(0);
  const returnToDefault = () => {
    setIsClosed(0);
    localStorage.setItem("closed", 0);
    imagesToHide.length = 0;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const dateDay = date.getDate();
    return dateDay + " " + month + " " + year;
  };

  const [imagesToHide, setImagesToHide] = useState([]);

  return (
    <div className="card__wrapper">
      <div className="wrapper__setters">
        <select onChange={handleChooseCategory} value={chooseSort}>
          {sortArr.map((i) => (
            <option value={i} key={i}>
              Сортировка по категории {i}
            </option>
          ))}
        </select>
        <button onClick={returnToDefault}>Обнулить</button>

        <label>
          Date
          <input type="radio" name="Sort by date" />
        </label>
        <label>
          Category
          <input type="radio" name="Sort by category" />
        </label>
        <label>
          Filesize
          <input type="radio" name="Sort by filesize" />
        </label>
      </div>

      {cardInfo &&
        cardInfo.map((item, index) => {
          if (item.category === chooseSort) {
            return (
              <div key={index}>
                {!imagesToHide.includes(item.image) ? (
                  <div className="wrapper__item">
                    <img
                      alt={item.category}
                      width={"150px"}
                      height={"150px"}
                      src={baseUrl + item.image}
                    />
                    <p>{formatDate(item.timestamp)}</p>
                    <p>SIZE: {(item.filesize / 1024).toFixed(2)} KB</p>
                    <p>CATEGORY: {item.category}</p>
                    <button
                      onClick={() => {
                        localStorage.setItem(
                          "closed",
                          setIsClosed(isClosed + 1)
                        );
                        setImagesToHide((prevState) => [
                          ...prevState,
                          item.image,
                        ]);
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : null}
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default CardsItem;

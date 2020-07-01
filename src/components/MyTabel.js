import React, { useState, useEffect } from "react";

const MyTabel = () => {
  const [obj, setObj] = useState({});
  const [objArr, setObjArr] = useState([]);

  const [symbol, setSymbol] = useState();
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    if (objArr.length > 0) {
      setInterval(() => {
        fetch(`https://api.binance.com/api/v1/ticker/price?symbol=${symbol}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((response) => {
            var any = objArr.findIndex((item) => item.symbol === symbol);
            debugger;

            const arr = [...objArr];
            arr[any] = response;

            setObjArr([...arr]);

            //   objArr[any]=response

            if (any === -1) {
              console.log("notFound");
            } else {
              if (objArr[any].price !== response.price) {
                setBgColor("Red");
              } else {
                setBgColor("green");
              }
            }
          })
          .catch((err) => console.log(err));
      }, 5000);
    }
  }, [objArr]);

  const helper = (response) => {
    var holder = {};
    holder = response;
    // debugger
    console.log(holder, "holder");

    setObjArr([...objArr, holder]);

    // recall();
  };

  const deleteRow = (index) => {
    objArr.splice(index, 1);
    console.log(index);
    setObjArr([...objArr]);
  };

  const recall = () => {
    debugger;
    setInterval(() => {
      fetch(`https://api.binance.com/api/v1/ticker/price?symbol=${symbol}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          var any = objArr.findIndex((item) => item.symbol === symbol);
          debugger;

          //           objArr[any]=response
          // debugger
          //           setObjArr(objArr)

          if (any === -1) {
            console.log("notFound");
          } else {
            if (objArr[any].price !== response.price) {
              setBgColor("Red");
            } else {
              setBgColor("green");
            }
          }
        })
        .catch((err) => console.log(err));
    }, 5000);
  };

  return (
    <div>
      <div>
        <input
          placeholder="symbol"
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            var anyIndex = objArr.findIndex((item) => item.symbol === symbol);
            debugger;

            if (anyIndex === -1) {
              fetch(
                `https://api.binance.com/api/v1/ticker/price?symbol=${symbol}`,
                {
                  method: "GET",
                }
              )
                .then((response) => response.json())
                .then((response) => {
                  // console.log(response);
                  debugger;
                  helper(response);
                })
                .catch((err) => console.log(err));
            } else {
              alert("already exists");
            }
          }}
        >
          Add row
        </button>
        {console.log(objArr)}
      </div>
      <table style={{ width: "50%" }}>
        <tr>
          <th>S.NO</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Delete row</th>
        </tr>

        {objArr
          ? objArr.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.symbol}</td>
                  <td style={{ color: bgColor }}>{item.price}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteRow(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
};

export default MyTabel;

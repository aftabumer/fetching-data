import React, { useState, useEffect } from "react";

const Table = () => {
  const [itemLists, setitemLists] = useState();
  const [toggle, settoggle] = useState(false);
  const [price, setprice] = useState("LTCBTC");

  useEffect(() => {
    fetch(`https://api.binance.com/api/v1/ticker/price?symbol=${price}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        debugger;
        setitemLists((res = itemLists));
      })
      .catch((err) => console.log(err));
  }, [fetch]);

  return (
    <>
      {console.log("items: ", itemLists)}
      <div>
        <p>{itemLists}</p>
        <button
          onClick={() => {
            settoggle(!toggle);
          }}
        >
          click me..!
        </button>

        {toggle && (
          <div>
            <input
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder="enter price"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Table;

import React from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = React.useState("");
  const [items, setItems] = React.useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const onClick = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: 500,
          y: -500,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      alert("введите что-нибудь...");
      setItem("");
    }
  };
  const handleDelete = (id) => {
    setItems(items.filter((x) => x.id !== id));
  };
  const handleStop = (data, index) => {
    let newArray = [...items];
    newArray[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArray);
  };
  return (
    <>
      <div className="wrapper">
        <input
          type="text"
          name="todo"
          value={item}
          placeholder="Введите что-нибудь"
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="enter" onClick={onClick}>
          Добавить
        </button>
      </div>
      {items.map((x, i) => {
        return (
          <Draggable
            key={i}
            defaultPosition={x.defaultPos}
            onStop={(_, data) => {
              handleStop(data, i);
            }}
          >
            <div className="todo" style={{ backgroundColor: x.color }}>
              {x.item}
              <button className="delete" onClick={() => handleDelete(x.id)}>
                X
              </button>
            </div>
          </Draggable>
        );
      })}
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useMotionValue, Reorder, animate } from "framer-motion";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Follow me on Twitter",
      subtitle: "Get more updates by following me on Twitter",
      date: "32.8.2024",
      link: "https://twitter.com/example",
    },
    {
      id: 2,
      title: "Star the repo",
      subtitle: "If you like this, star the repo",
      date: "32.8.2024",
      link: "https://github.com/example",
    },
    {
      id: 3,
      title: "Share it with your friends",
      subtitle: "If you like it, please share it with your friends",
      date: "32.8.2024",
      link: "https://example.com",
    },
  ]);

  return (
    <div className="w-full bg-white">
      <div className="max-w-md sec bg-white position mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Reorder List</h1>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="space-y-4"
        >
          {items.map((item) => (
            <ReorderItem key={item.id} item={item} />
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}

function ReorderItem({ item }) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      value={item}
      style={{ y, boxShadow }}
      className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing"
    >
      <div>
        <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
        <p className="text-sm text-gray-600">{item.subtitle}</p>
        <small className="text-gray-400">{item.date}</small>
        <button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
          Button
        </button>
        <br />
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          Visit
        </a>
      </div>
    </Reorder.Item>
  );
}

const useRaisedShadow = (value) => {
  const boxShadow = useMotionValue("0px 0px 0px rgba(0,0,0,0.2)");

  useEffect(() => {
    let isDragging = false;

    value.onChange((latest) => {
      const wasDragging = isDragging;

      if (latest !== 0) {
        isDragging = true;
        if (isDragging !== wasDragging) {
          animate(boxShadow, "0px 5px 10px rgba(0, 0, 0, 0.2)");
        }
      } else {
        isDragging = false;
        if (isDragging !== wasDragging) {
          animate(boxShadow, "0px 0px 0px rgba(0, 0, 0, 0.2)");
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
};

export default App;

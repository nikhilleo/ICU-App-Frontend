import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import styles from './index.module.scss'
import { HUMANBODY } from "components/Icons";

export default function App() {
  const options = [
    { label: "Fluid Pipe", value: "Fluid Pipe" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
    { label: "Watermelon 🍉", value: "watermelon" },
  ];

  const [selected, setSelected] = useState([]);

  return (
    <div className={`${styles.main}  `}>
      {/* <div className={`${styles.Select}  `}>
        <h1>Select  </h1>
      </div> */}
      <div className={`${styles.SelectDropdown}  `}>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select"}
        />
      </div>
      <div className={`${styles.HumanBody}  `}>
        <HUMANBODY />
      </div>
    </div>
  );
}

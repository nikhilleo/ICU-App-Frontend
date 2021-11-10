import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import styles from './index.module.scss'
import { HUMANBODY } from "components/Icons";

export default function App({data, setData}: any) {
  const options = [
    { label: "Ryles tube", value: "Ryles tube" },
    { label: "Endotracheal tube", value: "Endotracheal tube" },
    { label: "Tracheostomy tube", value: "Tracheostomy tube" },
    { label: "Foley catheter", value: "Foley catheter" },
    { label: "Drain", value: "Drain" },
    { label: "Dialysis lumen", value: "Dialysis lumen" },
    { label: "Central line", value: "Central line" },
    { label: "Intravenous catheter", value: "Intravenous catheter" },
  ];

  return (
    <div className={`${styles.main}  `}>
      {/* <div className={`${styles.Select}  `}>
        <h1>Select  </h1>
      </div> */}
      <div className={`${styles.SelectDropdown}  `}>
        <MultiSelect
          options={options}
          value={data}
          onChange={setData}
          labelledBy={"Select"}
        />
      </div>
      <div className={`${styles.HumanBody}  `}>
        <HUMANBODY />
      </div>
    </div>
  );
}

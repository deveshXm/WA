import React from "react";
import DatePicker from "react-datepicker";

import calenderIcon from "../../assets/calender.svg"

const CustomInput = React.forwardRef(({ value, onClick }: any, ref) => (
    <div
      onClick={onClick}
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        justifyContent: "center",
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        padding: "10px",
        borderRadius: "7px",
      }}
    >
      {value ? (
        <span style={{ color: "#cdcdcd", fontSize: "small", marginRight: "4px" }}>{value}</span>
      ) : (
        <>
          <span style={{ color: "#cdcdcd", fontSize: "small", marginRight: "4px" }}>{"Start date ⇀ End date"}</span>
          <img src={calenderIcon} alt="Calendar" style={{ marginRight: "5px", width: "15px", height: "15px" }} />
        </>
      )}
    </div>
  ));

function DateRangePicker({ header, dateRange, handleDateChange } : DateRangePickerProps ) {
  return (
    <DatePicker
      key={header.key}
      selectsRange={true}
      startDate={dateRange[0] || undefined}
      endDate={dateRange[1] || undefined}
      onChange={handleDateChange}
      isClearable={true}
      dateFormat="yyyy-MM-dd"
      customInput={<CustomInput />}
    />
  );
}

export default DateRangePicker;

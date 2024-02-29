"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="ps-4 my-5">
      <div className="d-flex justify-content-star align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Start date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>

        <div className="mb-3 me-4">
          <label className="form-label d-block">End date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>

        <button className="btn form-btn ms-4 mt-3 px-5">Fetch</button>
      </div>
    </div>
  );
};

export default Dashboard;

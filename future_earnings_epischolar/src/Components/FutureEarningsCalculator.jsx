import Multiselect from "multiselect-react-dropdown";
import React, { useContext, useState } from "react";
import { ResponsiveContainer } from "recharts";

import SelectBranch from "./SelectBranch";
import SelectCurrency from "./SelectCurrency";
import Graph from "./Graph";
import SavingVSInvestment from "./SavingVSInvestment";

// ------------- data -----------------------

import data from "../data/Savings/Branch_wise/savings.json";
import { SelectContext } from "../Context/SelectContext";

const FutureEarningsCalculator = () => {
  const { selectData, changeSelectData } = useContext(SelectContext);

  const handleLoan = (e) => {
    let value = e.target.value;

    changeSelectData({
      ...selectData,
      loan_amount: value,
    });
  };
  const handleSalary = (e) => {
    let value = e.target.value;
    changeSelectData({
      ...selectData,
      annual_salary: value,
    });
  };

  return (
    <div className="text-center py-[1.75rem] md:gap-y-[4rem] md:gap-x-[4rem]  flex md:flex-row flex-col  bg-[#fff] rounded-[20px] w-[100%]  text-[#333]">
      <div className="md:w-[30%] w-[100%]">
        <form action="">
          {/* -------------- Loan Amount Input ---------------- */}
          <div className="mb-[24px]">
            <div className="flex justify-between">
              <label htmlFor="">Loan Amount (%)</label>
              <label htmlFor="">{selectData.loan_amount}%</label>
            </div>

            <input
              type="range"
              value={selectData.loan_amount}
              className="w-full bg-red-500 h-2 rounded-lg  appearance-none cursor-pointer focus:outline-none"
              min="0"
              max="100"
              step={"0.01"}
              onInput={(e) => handleLoan(e)}
            />
          </div>

          {/* -------------- Annual Salary Input ---------------- */}

          <div className="mb-[24px]">
            <div className="flex justify-between">
              <label htmlFor="">Annual Salary (INR)</label>
              <label htmlFor="">{selectData.annual_salary}</label>
            </div>
            <input
              type="range"
              value={selectData.annual_salary}
              className="w-full bg-red-500 h-2 rounded-lg  appearance-none cursor-pointer focus:outline-none"
              min="100000"
              max="4000000"
              onInput={(e) => handleSalary(e)}
            />
          </div>

          {/* ------------------ Target Branch ----------------- */}

          <SelectBranch />

          {/* ---------------- Target Country ----------------- */}

          <Multiselect
            placeholder="Select Country"
            className="mb-[24px]  z-[12] "
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck(selectedList, selectedItem) {
              changeSelectData({
                ...selectData,
                Country: selectedList,

              });
            }}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck(selectedList, selectedItem) {
              changeSelectData({
                ...selectData,
                Country: selectedList,
              });
            }}
            emptyRecordMsg="No options available"
            options={["Australia", "Canada", "Germany", "United States"]}
            selectedValues={selectData.Country[0]?[selectData.Country[0]]: []}
          />

          {/* ---------------- College Ranking Range ----------------- */}

          <Multiselect
            className="mb-[24px]  z-[11] "
            placeholder="Select College Ranking Range"
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck(selectedList, selectedItem) {
              console.log("College ranking",selectedList)
              changeSelectData({
                ...selectData,
                College_Ranking: selectedList,
              });
            }}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck(selectedList, selectedItem) {
              changeSelectData({
                ...selectData,
                College_Ranking: selectedList,
              });
            }}
            emptyRecordMsg="No options available"
            options={["1-50", "51-100", "101-250", "251-500"]}
            selectedValues={selectData.College_Ranking[0]?[selectData.College_Ranking[0]]:[]}
          />

          {/* ------------------ Select Currency ----------------- */}

          <SelectCurrency />
        </form>
      </div>

      {/* ---------------- Line and Bar graph --------------------------- */}

      <div className="md:w-[70%] w-[100%]">
        <div className="shadow-lg p-5 mb-[2.5rem]">
          <h1 className="text-[24px]">Your Estimated Savings Over the Years</h1>
          <div className="w-[100%]">
            <Graph />
          </div>
        </div>

        <div className="w-[100%] shadow-lg p-5 mb-[2.5rem]">
          <h1>Salary vs. Investment Chart</h1>

          <div className="w-[100%] ">
            <SavingVSInvestment />
          </div>
        </div>

        <p>
          This graph shows your estimated annual savings in an abroad country.
          Depending on your loan amount %, the initial years may show negative
          savings as you won't be earning. Estimated savings rise over time. The
          data shown is based on average alumni salaries from your chosen course
          and college.
        </p>
      </div>
    </div>
  );
};

export default FutureEarningsCalculator;

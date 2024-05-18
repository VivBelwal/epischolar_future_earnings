import React, { useContext, useEffect, useState } from "react";
import savings from "../data/Savings/Branch_wise/savings.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { SelectContext } from "../Context/SelectContext";

const Graph = () => {
  const { selectData, changeSelectData } = useContext(SelectContext);
  const [data, setData] = useState([]);
  console.log("Data", savings.data);
  // function filterData(jsonData, userInput) {
  //   const branchData = jsonData.data.find(item => item.Branch === userInput.Branch);
  //   if (!branchData) return [];

  //   const country = userInput.Country[0].toUpperCase();
  //   const rankingRange = userInput.College_Ranking[0];
  //   const currency = userInput.Currency.split(' ')[0];
  //    console.log(country)
  //   const filteredData = branchData[country[0]+country[1]+country[2]][rankingRange][currency];
  //   console.log(filterData)
  //   return filteredData.map(item => ({
  //     name: item.year.toString(),
  //     [country]: item.saving
  //   }));
  // }

  function filterData(jsonData, userInput) {
    const branchData = jsonData.data.find(
      (item) => item.Branch === userInput.Branch
    );
    if (!branchData) return [];

    const countries = userInput.Country.map((country) => {
      if (country.toUpperCase() === "AUSTRALIA") {
        return "AUS";
      } else if (country.toUpperCase() === "GERMANY") {
        return "GER";
      } else if (country.toUpperCase() === "CANADA") {
        return "CAN";
      } else if (country.toUpperCase() === "UNITED STATES") {
        return "USA";
      }
    });
    const rankingRanges =
      userInput.College_Ranking[0] === "ALL"
        ? Object.keys(branchData[countries[0]])
        : userInput.College_Ranking;
    const currency = userInput.Currency.split(" ")[0];

    let selectedRankingRanges = rankingRanges;
    if (countries.length > 1 && rankingRanges.length > 1) {
      selectedRankingRanges = ["51-100"];
    }

    const filteredData = [];

    for (let i = 0; i <= 10; i++) {
      const yearData = { name: i.toString() };
      countries.forEach((country) => {
        yearData[country] = 0;
        selectedRankingRanges.forEach((range) => {
          const countryData = branchData[country][range][currency];
          if (countryData) {
            const dataForYear = countryData.find((data) => data.year === i);
            if (dataForYear) {
              yearData[country] += dataForYear.saving;
            }
          }
        });
      });
      filteredData.push(yearData);
    }

    return filteredData;
  }

  useEffect(() => {
    console.log("selected data", selectData);
    const newData = filterData(savings, selectData);

    console.log("newData", newData);
    setData(newData);
  }, [selectData]);
  return (
    <ResponsiveContainer
      width={"100%"}
      height={300}
      className={"m-auto mt-[20px]"}
    >
      <LineChart
        data={data}
        className={"text-[10px]"}
        margin={{
          top: 5,
          right: 30,
          left: 20,
        }}
      >
        <XAxis dataKey="name">
          <Label
            value="Number of years after your course starts"
            offset={0}
            position="insideBottom"
          />
        </XAxis>
        <YAxis
          label={{
            value: `Savings in ${selectData.Currency}`,
            angle: -90,
            position: "insideBottomLeft",
            className: "text-[10px]",
          }}
        />
        <Tooltip />
        <Legend />
        {}
        <Line
          type="monotone"
          dataKey="USA"
          stroke="green"
          activeDot={{ r: 8 }}
          className={"top-[25px]"}
        />
        <Line type="monotone" dataKey="CAN" stroke="blue" />
        <Line type="monotone" dataKey="GER" stroke="red" />
        <Line type="monotone" dataKey="AUS" stroke="#bdb106" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;

import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import AddEntryForm from "../components/transactions/AddEntryForm";
import { PieChart, Pie, Legend, Tooltip, Sector, Cell } from "recharts";
import { UserAuth } from "../context/AuthContext";

export default function HomePage({ entries, fetchTransaction }) {
  const [userinfo, setUserInfo] = UserAuth();
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const incomeColours = ["#9C27B0", "#3F51B5", "#03A9F4", "#009688", "#8BC34A"];
  const expenseColours = ["#FF7043", "#FFCA28", "#D4E157", "#66BB6A"];

  useEffect(() => {
    const id = userinfo.id;
    fetch(`/api/transaction/income/total/${id}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].total = data[i].total / 100;
        }
        setIncome(data);
      });
  }, [entries]);

  const incomeData = income.map(({ _id: name, total: value }) => ({
    name,
    value,
  }));

  useEffect(() => {
    const id = userinfo.id;
    fetch(`/api/transaction/expense/total/${id}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].total = data[i].total / 100;
        }
        setExpense(data);
      });
  }, [entries]);

  const expenseData = expense.map(({ _id: name, total: value }) => ({
    name,
    value,
  }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      {userinfo.id && (
        <>
          <div className="home-page">
            <NavigationBar />
            <div className="income-wrapper">
              <h3>Income</h3>

              {/* to display message if no entries present */}
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={incomeData}
                  cx={200}
                  cy={200}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {incomeData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={incomeColours[index % incomeColours.length]}
                    />
                  ))}
                </Pie>
                <Legend layout="vertical" />
                <Tooltip />
              </PieChart>
            </div>
            <div className="expenses-wrapper">
              {/* to display message if no entries present */}
              <h3>Expenses</h3>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={expenseData}
                  cx={200}
                  cy={200}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {expenseData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={expenseColours[index % expenseColours.length]}
                    />
                  ))}
                </Pie>
                <Legend layout="vertical" />
                <Tooltip />
              </PieChart>
            </div>
          </div>
          <AddEntryForm fetchTransaction={fetchTransaction} />
        </>
      )}
    </>
  );
}

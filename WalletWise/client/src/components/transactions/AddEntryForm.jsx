import * as React from "react";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import Toggle from "../Toggle";

function AddEntryForm({ fetchTransaction }) {
  const [userinfo, setUserInfo] = UserAuth();
  const [account, setAccount] = useState([]);
  let date = dayjs().format("YYYY-MM-DD");
  const [transactionInfo, setTransactionInfo] = useState({
    accountName: "",
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: date,
    userid: userinfo.id,
  });
  const expenseSelection = ["Food", "Transport", "Entertainment", "Others"];
  const incomeSelection = [
    "Salary",
    "Deposit",
    "Bonus",
    "Investments",
    "Others",
  ];

  const expenses = expenseSelection.map((ele) => {
    return (
      <option key={ele} value={ele}>
        {ele}
      </option>
    );
  });
  const incomes = incomeSelection.map((ele) => {
    return (
      <option key={ele} value={ele}>
        {ele}
      </option>
    );
  });

  useEffect(() => {
    const id = userinfo.id;
    fetch(`/api/account/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
      });
  }, []);

  function handleChange(event) {
    const value = event.target.value;
    if (event.target.name === "amount") {
      setTransactionInfo({
        ...transactionInfo,
        [event.target.name]: value * 100,
      });
    } else {
      setTransactionInfo({
        ...transactionInfo,
        [event.target.name]: value,
      });
    }
  }

  //will post multiply times if spam click button-allow POST once only
  const handleSubmit = async () => {
    const info = transactionInfo;
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      fetchTransaction();
      // const data = await response.json();

      // fetch("/api/transaction/")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setEntries(data);
      //     setNewEntry(true);
      //   });
    } catch (error) {
      //   setMsg("Something went wrong!");
      alert(error);
    }
  };

  return (
    <>
      <fieldset>
        <legend>New Transaction Entry</legend>
        <Toggle
          transactionInfo={transactionInfo}
          setTransactionInfo={setTransactionInfo}
        />
        <br />
        <label>
          Account Name:
          <select
            name="accountName"
            id="type-select"
            defaultValue={"default"}
            onChange={handleChange}
          >
            <option value="default" disabled>
              Select Account
            </option>
            {account?.map((account) => (
              <option key={account._id} value={account.accountName}>
                {account.accountName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Category:
          <select
            name="category"
            id="type-select"
            defaultValue={"default"}
            onChange={handleChange}
          >
            <option value="default" disabled>
              Select type
            </option>
            {transactionInfo?.type === "income" ? incomes : expenses}
            {/* <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="dividends">Dividends</option>
            <option value="others">Others</option> */}
          </select>
          {/* <input
            name="type"
            type="string"
            defaultValue=""
            onChange={handleChange}
          /> */}
        </label>
        <br />
        <label>
          Amount:
          <input
            required
            name="amount"
            type="number"
            step="any"
            min="0"
            defaultValue=""
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            type="string"
            defaultValue=""
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <label>
          Date:
          <input
            name="date"
            type="date"
            defaultValue={date}
            onChange={handleChange}
          ></input>
        </label>
      </fieldset>
      <button onClick={handleSubmit}>Add Entry</button>
    </>
  );
}

export default AddEntryForm;

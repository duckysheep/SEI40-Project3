import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function EditAccountPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [account, setAccount] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const info = Object.fromEntries(formData);
    info.accountBalance = info.accountBalance * 100;

    const response = await fetch(`/api/account/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    await response.json();
    navigate("/accounts-overview");
  };

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(`/api/account/edit-account/${id}`);
      const data = await response.json();
      setAccount(data);
    };
    fetchAccount();
  }, [id]);

  return (
    <>
      <NavigationBar />
      <div className="edit-account-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Edit Your Account Details</legend>
            <label>
              Account Name:{" "}
              <input
                required
                name="accountName"
                type="text"
                defaultValue={account.accountName}
              />
            </label>
            <br />
            <label>
              Account Type:{" "}
              <select
                name="accountType"
                id="type-select"
                defaultValue={account.accountType}
              >
                <option value="Bank Account">Bank Account</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Loans">Loans</option>
                <option value="Investments">Investments</option>
              </select>
            </label>
            <br />
            <label>
              Account Balance{" "}
              <input
                required
                name="accountBalance"
                type="number"
                step="any"
                min="0"
                defaultValue={account.accountBalance}
              />
            </label>
            <br />
            <label>
              Currency:{" "}
              <input
                required
                name="currency"
                type="text"
                defaultValue={account.currency}
              ></input>
            </label>
            <br />
          </fieldset>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
}

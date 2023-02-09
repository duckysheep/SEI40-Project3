import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import AddAccountForm from "../components/accounts/AddAccountForm";
import { UserAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

function AccountsPage({ entries }) {
  const [useraccounts, setUserAccounts] = useState([]);
  const [addnewaccount, setAddNewAccount] = useState(false);
  const [userinfo, setUserInfo] = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAccounts = async () => {
      const id = userinfo.id;
      const response = await fetch(`/api/account/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setUserAccounts(data));
    };
    fetchUserAccounts();
    setAddNewAccount(false);
  }, [addnewaccount]);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/account/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserAccounts(useraccounts.filter((ele) => ele._id !== id));
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const data = [
    {
      name: "Page A", //* (MMM/YYYY)
      Income: 4000,
      Expenses: 2400,
    },
    {
      name: "Page B",
      Income: 3000,
      Expenses: 1398,
    },
    {
      name: "Page C",
      Income: 2000,
      Expenses: 9800,
    },
    {
      name: "Page D",
      Income: 2780,
      Expenses: 3908,
    },
    {
      name: "Page E",
      Income: 1890,
      Expenses: 4800,
    },
    {
      name: "Page F",
      Income: 2390,
      Expenses: 3800,
    },
  ];

  return (
    <>
      <NavigationBar />
      <br />
      <AddAccountForm userinfo={userinfo} setAddNewAccount={setAddNewAccount} />
      <Divider>
        <Chip label="All Your Accounts" />
      </Divider>
      <div className="all-accounts-container">
        <Box sx={{ minWidth: 660, minHeight: 250 }}>
          <Masonry columns={5} spacing={2}>
            {useraccounts?.map((account, index) => (
              <Item key={index} sx={{ height: 210 }}>
                <p>
                  <b>{account?.accountType}</b>
                  <br />
                  <br />
                  {account?.accountName}
                  <br />
                  {account?.accountBalance} {account?.currency}
                </p>
                <IconButton
                  aria-label="edit account"
                  onClick={() => navigate(`/edit-account/${account._id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete account"
                  onClick={() => handleDelete(account._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Item>
            ))}
          </Masonry>
        </Box>
      </div>
    </>
  );
}

export default AccountsPage;

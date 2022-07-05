import "./App.css";
import React, { useState, useEffect } from "react";
import useTenk from "./near/useTenk";
import { signIn, wallet } from "./near";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:string/:id" element={<Main />} />
      </Routes>
    </Router>
  );
}

function Main() {
  let { string, id } = useParams();
  const [roleVerified, setRoleVerified] = useState(false);
  const fetcht = require("node-fetch");

  const currentUser = wallet.getAccountId();
  const { nfts } = useTenk();

  function signOut() {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  }

  const isWalletConnect = async () => {
    signIn();
  };

  const isRoleverify = async () => {
    const body = {
      id: id,
      image: nfts[0].media,
      name: nfts[0].metadata?.title
    };
    const dcResponse = await fetcht("http://localhost:9090/", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const res = await dcResponse;
    setRoleVerified(true);
  };

  useEffect(() => {
    console.log(currentUser);
    console.log(nfts);
  }, [roleVerified]);

  return (
    <div className="App">
      <header className="App-header">
        {!currentUser ? (
          <>
            <div className="">
              <img src="../assets/logo.png" className="App-logo" alt="logo" />
            </div>
            <div
              className="bg-card"
              style={{ padding: "1.5rem", marginTop: "1rem" }}
            >
              <h2 style={{ margin: "0", paddingBottom: ".5rem" }}>
                Connect your wallet to make sure you own Rakkigusu NFTs
              </h2>
              <button
                className="req-button"
                onClick={isWalletConnect}
                style={{ textDecoration: "none" }}
              >
                Connect
              </button>
              <br />
            </div>
          </>
        ) : (
          <>
            {nfts.length > 0 ? (
              <>
                <button className="req-button" onClick={signOut}>
                  Sign Out
                </button>
                <div className="">
                  <img
                    src="../assets/logo.png"
                    className="App-logo"
                    alt="logo"
                  />
                </div>
                <div
                  className="bg-card"
                  style={{ padding: "1.5rem", marginTop: "1rem" }}
                >
                  {!roleVerified ? (
                    <>
                      <label
                        style={{
                          margin: "0",
                          paddingBottom: ".5rem",
                          color: "#d9689b",
                        }}
                      >
                        <strong> Your NFTs Detected!</strong>
                      </label>
                      <br />
                      <label>Your wallet : {currentUser}</label>
                      <h2 style={{ margin: "0", paddingBottom: ".5rem" }}>
                        Verify your role
                      </h2>
                      <button
                        className="req-button"
                        onClick={isRoleverify}
                        style={{ textDecoration: "none" }}
                      >
                        Verify
                      </button>
                      <br />
                    </>
                  ) : (
                    <h3
                      style={{
                        margin: "0",
                        paddingBottom: ".5rem",
                        color: "#d9689b",
                      }}
                    >
                      Congratulation! Your role successfully updated.
                      <br />
                      You can check your new role on discord now.
                    </h3>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="req-button" onClick={signOut}>
                  Sign Out
                </button>
                <div className="">
                  <img src="../assets/logo.png" className="App-logo" alt="logo" />
                </div>
                <div
                  className="bg-card"
                  style={{ padding: "1.5rem", marginTop: "1rem" }}
                >
                  <h3
                    style={{
                      margin: "0",
                      paddingBottom: ".5rem",
                      color: "red",
                    }}
                  >
                    Seems you don't have any Rakkigusu NFT yet.
                    <br />
                    You can buy our NFTs on{" "}
                    <a href="https://paras.id/">Paras.id </a>
                    first.
                  </h3>
                </div>
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;

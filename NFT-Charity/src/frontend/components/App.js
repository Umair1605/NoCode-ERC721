import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from './Navbar';
// import Home from './Home.js'
import Create from './Create.js'

import { useState,useEffect } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import './App.css';
import Web3 from 'web3'
function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [signers, setSigner] = useState();
  const [web3,setWeb3] = useState();
  
  // MetaMask Login/Connect
  const web3Handler = async () => {
    console.log("cehck")
    if (!window.ethereum) {
      console.log("Check Metamask..");
    } else {
      let web3;

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("account : ",accounts)
      web3 = new Web3(window.ethereum);
      
      const account = accounts[0];

      setAccount(account)
      setWeb3(web3);
    }
    setLoading(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navbar web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Create account={account} web3={web3} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

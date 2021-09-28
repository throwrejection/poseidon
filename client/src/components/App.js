import logo from '../logo.svg';
import './App.css';
import Web3 from 'web3';
import Poseidon from '../contracts/Poseidon.json';
import {useEffect, useState} from "react";

export default function App() {
  const [contract, setContract] = useState({});
  const [totalSupply, setTotalSupply] = useState(0);

    useEffect(() => {
        loadWeb3().then();
        loadBlockchainData().then();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]});

        const networkId = await web3.eth.net.getId();
        const networkData = Poseidon.networks[networkId];
        if (networkData) {
            const abi = Poseidon.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            setContract(contract);
            const totalSupply = await contract.methods.totalSupply().call();
            setTotalSupply(totalSupply);
        } else {
            window.alert('Smart contract not deployed to detected network.')
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}
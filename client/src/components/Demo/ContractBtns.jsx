import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  // const { state: { contract, accounts } } = useEth();
  const { state: { contract, accounts, artifact, web3, networkID } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [price, setPrice] = useState("");
  const [output, setOutput] = useState("");

  const abi = require("../../contracts/ItemManager.json");

  // Check outputs
  console.log("ABI:", abi);
  console.log("Contract Address:");
  console.log("Contract:", contract);
  console.log("Accounts:", accounts);
  console.log("Web3:", web3);
  console.log("NetworkID:", networkID);

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  // createItem function 
  const createItem = async () => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }
    if (identifier === "" || price === "") {
      alert("Please enter an identifier and price for the item.");
      return;
    }
    const priceInWei = web3.utils.toWei(price, "ether");
    await contract.methods.createItem(identifier, priceInWei).send({ from: accounts[0] });
  };

  // triggerPayment function
  const triggerPayment = async (index) => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }
    if (inputValue === "") {
      alert("Please enter the item index.");
      return;
    }
    const amountInWei = web3.utils.toWei(inputValue, "ether");
    await contract.methods.triggerPayment(index).send({ from: accounts[0], value: amountInWei });
  };

  return (
    <div className="btns">

      <div>
        <h2>Create Item</h2>
        <br />
        <input
          type="text"
          placeholder="Item Identifier"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price in Ether"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button onClick={createItem}>
          Create Item
        </button>
      </div>

      <br />
      <hr />
      <br />

      <div>
        <h2>Trigger Payment</h2>
        <br />
        <input
          type="text"
          placeholder="Item Index"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={() => triggerPayment(parseInt(inputValue))}>
          Trigger Payment
        </button>
      </div>

      <div>
        <p>{output}</p>
      </div>


    </div>
  );
}

export default ContractBtns;

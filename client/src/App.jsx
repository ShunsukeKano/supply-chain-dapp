import { EthProvider } from "./contexts/EthContext";
// import Intro from "./components/Intro";
// import Setup from "./components/Setup";
import Demo from "./components/Demo";
// import Footer from "./components/Footer";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <h1>Assignment 7: Create a DApp with simple Front end</h1>
          {/* <Intro />
          <hr />
          <Setup /> */}
          <hr />
          <Demo />
          <hr />
          {/* <Footer /> */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

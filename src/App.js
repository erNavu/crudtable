import "./App.css";
import { Provider } from "react-redux";

import store from "./store";
import Table from "./component/table";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Table />
      </Provider>
    </div>
  );
}

export default App;

import "./App.css";
import Character from "./Component/character";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleCharater from "./Component/singleCharater";

function App() {
  return (
    <div className="App">
      <div>Hello World!</div>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Character />}></Route>
            <Route
              exact
              path={`/singleCharacter/:id`}
              render={(routeProps) => {
                return <SingleCharater {...routeProps} />;
              }}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

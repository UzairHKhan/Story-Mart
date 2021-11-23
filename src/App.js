
import './App.css';
import {
  BrowserRouter as Router
}
  from "react-router-dom";
import RouterComp from './componants/router/routes';


function App() {
  return (
    <>
      <Router>
        {/* <NavBarCart /> */}
        <RouterComp />
      </Router>
    </>
  );
}

export default App;

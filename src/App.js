import './App.css';
import { Link } from "react-router-dom";
import Header from './components/Header'

// #FEF9EF (white primary)
// #227C9D (blue secondary)
// #FFCB77 (tan tertiary)
// #FE6D73 (pink info + alerts)

const App = () => {
  return (
    <div className="AppFull">
      <Header />
      <div className="App">
        <div className="Content">
          <h1>Quinn's Collection</h1>
          <Link to="/model" className="Link">View Models</Link>
          <br/>
          <Link to="/card" className="Link">View Cards</Link>
          <br />
          <Link to="/manga" className="Link">View Manga</Link>
        </div>
      </div>
    </div>
  )
};

export default App;
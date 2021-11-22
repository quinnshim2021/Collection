import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const displayDesktop = () => {
    return <Toolbar className={"Header"}><Link to="/" className="headerLink">Quinn's Collection</Link>
    <div className="headerOther">
        <Link className="headerLink" to="/model">Models</Link>
        <Link className="headerLink" to="/card">Cards</Link>
        <Link className="headerLink" to="/manga">Manga</Link>
    </div>    
        </Toolbar>;
  };
  
  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}
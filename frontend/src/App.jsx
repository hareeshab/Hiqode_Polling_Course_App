import React from 'react';
import { Link } from 'react-router-dom';

export default function App({ children }){
  return (
    <div className="container">
      <header className="row" style={{justifyContent:'space-between', marginBottom:16}}>
        <h1 style={{margin:0}}>HiQode Poll</h1>
        <nav className="row" style={{gap:12}}>
          <Link to="/">Vote</Link>
          <Link to="/results">Results</Link>
        </nav>
      </header>
      <div className="card">{children}</div>
      <p className="muted" style={{marginTop:12}}>Queue: Redis • DB: Postgres • Worker: BullMQ</p>
    </div>
  );
}

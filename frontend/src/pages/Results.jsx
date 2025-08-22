import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Results(){
  const [rows, setRows] = useState([]);
  const fetchResults = async () => {
    const { results } = await api.results();
    setRows(results);
  };
  useEffect(() => {
    fetchResults();
    const t = setInterval(fetchResults, 2000); // simple polling
    return () => clearInterval(t);
  }, []);

  const total = rows.reduce((a,r)=>a+r.votes,0);

  return (
    <div>
      <h2 style={{marginTop:0}}>Live Results</h2>
      <div className="grid">
        {rows.map(r => (
          <div key={r.label} className="row" style={{justifyContent:'space-between', background:'rgba(255,255,255,.08)', padding:12, borderRadius:10}}>
            <span>{r.label}</span>
            <strong>{r.votes}</strong>
          </div>
        ))}
      </div>
      <p className="muted" style={{marginTop:10}}>Total votes: {total}</p>
    </div>
  );
}

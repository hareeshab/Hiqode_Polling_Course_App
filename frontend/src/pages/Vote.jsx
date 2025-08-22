import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Vote(){
  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    api.poll().then(({ poll, options }) => { setPoll(poll); setOptions(options); });
  }, []);

  const handleVote = async (id) => {
    setSubmitting(true);
    await api.vote(id);
    setSubmitting(false);
    setDone(true);
  };

  if(!poll) return <p>Loading…</p>;

  return (
    <div>
      <h2 style={{marginTop:0}}>{poll.question}</h2>
      <div className="grid">
        {options.map(o => (
          <div key={o.id} className="row" style={{justifyContent:'space-between', background:'rgba(255,255,255,.08)', padding:12, borderRadius:10}}>
            <span>{o.label}</span>
            <button disabled={submitting || done} onClick={() => handleVote(o.id)}>
              {done ? 'Thanks!' : 'Vote'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const base = import.meta.env.VITE_API_BASE || '/api';
export const api = {
  async poll() { return fetch(`${base}/poll`).then(r => r.json()); },
  async vote(optionId) {
    return fetch(`${base}/vote`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ optionId }) }).then(r => r.json());
  },
  async results() { return fetch(`${base}/results`).then(r => r.json()); }
};

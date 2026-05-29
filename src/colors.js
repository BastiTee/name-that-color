import * as basics from './colorsets/basics.js';
import * as cssNamedColors from './colorsets/css-named-colors.js';

export const COLORSETS = [basics, cssNamedColors];

const _map = Object.fromEntries(COLORSETS.map(cs => [cs.id, cs]));

function loadColorsetId() {
  try { return localStorage.getItem('ntc-colorset') || 'basics'; } catch { return 'basics'; }
}

function saveColorsetId(id) {
  try { localStorage.setItem('ntc-colorset', id); } catch { /* ignore */ }
}

let _active = _map[loadColorsetId()] ?? basics;

export function getActiveColorset() { return _active; }

export function setActiveColorset(id) {
  _active = _map[id] ?? basics;
  saveColorsetId(_active.id);
}

// Run: node lib/countdown.check.mjs   (Node >= 23.6 strips the TS types)
import assert from 'node:assert/strict';
import { getCountdown } from './countdown.ts';

const target = '2026-12-12T08:30:00+07:00'; // = 01:30:00Z
assert.deepEqual(getCountdown(target, Date.parse('2026-12-11T00:29:59Z')), { days: 1, hours: 1, minutes: 0, seconds: 1 });
assert.deepEqual(getCountdown(target, Date.parse('2026-12-12T01:29:59Z')), { days: 0, hours: 0, minutes: 0, seconds: 1 });
assert.equal(getCountdown(target, Date.parse('2026-12-12T01:30:00Z')), null); // the moment itself: no zeros/negatives
assert.equal(getCountdown(target, Date.parse('2027-01-01T00:00:00Z')), null);
assert.equal(getCountdown('not a date', 0), null);
console.log('countdown ok');

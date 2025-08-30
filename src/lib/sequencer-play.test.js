// Test auto-play behavior
import { schedule, sine, cycle, clearSchedule } from './AudioBackend/sequencer.js';

console.log('Testing auto-play with chaining...\n');

// Mock time tracking
let playCount = 0;
let lastPlayedParams = null;

// Override play method to track calls
const originalPlay = sine(440).play;
Object.getPrototypeOf(sine(440)).play = function(time) {
  playCount++;
  lastPlayedParams = {
    freq: this._freq,
    attack: this._attack,
    decay: this._decay,
    velocity: this._velocity,
    effects: this._effects.length,
    time: time
  };
  console.log(`Play #${playCount}:`, lastPlayedParams);
  return originalPlay.call(this, time);
};

cycle(8);
clearSchedule();

// Test 1: Simple sine should play once
console.log('\nTest 1: Simple sine');
playCount = 0;
schedule('test1', 0, () => sine(440));
setTimeout(() => {
  console.log(`Total plays: ${playCount} (should be 1)`);
}, 100);

// Test 2: Chained methods should still play once
setTimeout(() => {
  console.log('\nTest 2: Chained sine with decay');
  playCount = 0;
  clearSchedule();
  schedule('test2', 0, () => sine(800).decay(2).reverb());
  
  setTimeout(() => {
    console.log(`Total plays: ${playCount} (should be 1)`);
    console.log('Final parameters:', lastPlayedParams);
  }, 100);
}, 200);

// Test 3: Complex chain
setTimeout(() => {
  console.log('\nTest 3: Complex chain');
  playCount = 0;
  clearSchedule();
  schedule('test3', 0, () => 
    sine(1000)
      .dur(0.5)
      .vel(0.9)
      .lowpass(500)
      .reverb(2, 0.5)
      .delay(0.1, 0.3)
  );
  
  setTimeout(() => {
    console.log(`Total plays: ${playCount} (should be 1)`);
    console.log('Final parameters:', lastPlayedParams);
  }, 100);
}, 400);
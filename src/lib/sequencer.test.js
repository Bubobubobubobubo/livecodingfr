// Test file for sequencer
import { sequencer, sine, saw, square, tri } from './sequencer.js';

// Mock context for testing
let testResults = [];

function runTest(name, fn) {
  console.log(`\nTesting: ${name}`);
  testResults = [];
  try {
    fn();
    console.log('✓ Test passed');
  } catch (error) {
    console.error(`✗ Test failed: ${error.message}`);
  }
}

// Test 1: Basic synth creation
runTest('Basic synth creation', () => {
  const synth = sine(440);
  console.assert(synth._freq === 440, 'Frequency should be 440');
  console.assert(synth._type === 'sine', 'Type should be sine');
  console.log('Created sine at 440Hz');
});

// Test 2: Method chaining
runTest('Method chaining', () => {
  const synth = sine(800)
    .decay(2)
    .attack(0.5)
    .vel(0.9);
  
  console.assert(synth._decay === 2, `Decay should be 2, got ${synth._decay}`);
  console.assert(synth._attack === 0.5, `Attack should be 0.5, got ${synth._attack}`);
  console.assert(synth._velocity === 0.9, `Velocity should be 0.9, got ${synth._velocity}`);
  console.log('Chained methods correctly set values');
});

// Test 3: dur() method splits correctly
runTest('dur() method', () => {
  const synth = sine(440).dur(1);
  
  console.assert(synth._attack === 0.1, `Attack should be 0.1, got ${synth._attack}`);
  console.assert(synth._decay === 0.9, `Decay should be 0.9, got ${synth._decay}`);
  console.assert(synth._sustain === 0, `Sustain should be 0, got ${synth._sustain}`);
  console.log('dur() correctly splits into attack and decay');
});

// Test 4: Effects chain building
runTest('Effects chain', () => {
  const synth = sine(440)
    .lowpass(500)
    .reverb(2, 0.7)
    .delay(0.5, 0.3, 0.6);
  
  console.assert(synth._effects.length === 3, `Should have 3 effects, got ${synth._effects.length}`);
  console.assert(synth._effects[0].type === 'filter', 'First effect should be filter');
  console.assert(synth._effects[0].params.frequency === 500, 'Filter frequency should be 500');
  console.assert(synth._effects[1].type === 'reverb', 'Second effect should be reverb');
  console.assert(synth._effects[2].type === 'delay', 'Third effect should be delay');
  console.log('Effects chain built correctly');
});

// Test 5: Different waveforms
runTest('Different waveforms', () => {
  const s1 = sine(440);
  const s2 = saw(440);
  const s3 = square(440);
  const s4 = tri(440);
  
  console.assert(s1._type === 'sine', 'sine() should create sine wave');
  console.assert(s2._type === 'sawtooth', 'saw() should create sawtooth wave');
  console.assert(s3._type === 'square', 'square() should create square wave');
  console.assert(s4._type === 'triangle', 'tri() should create triangle wave');
  console.log('All waveform types created correctly');
});

// Test 6: Complex chain
runTest('Complex chain', () => {
  const synth = sine(800)
    .decay(2)
    .reverb()
    .lowpass(1000)
    .vel(0.5);
  
  console.log('Synth properties:');
  console.log(`  Frequency: ${synth._freq}`);
  console.log(`  Decay: ${synth._decay}`);
  console.log(`  Velocity: ${synth._velocity}`);
  console.log(`  Effects count: ${synth._effects.length}`);
  console.log('  Effects:', synth._effects.map(e => e.type));
  
  console.assert(synth._freq === 800, `Frequency should be 800, got ${synth._freq}`);
  console.assert(synth._decay === 2, `Decay should be 2, got ${synth._decay}`);
  console.assert(synth._velocity === 0.5, `Velocity should be 0.5, got ${synth._velocity}`);
  console.assert(synth._effects.length === 2, `Should have 2 effects, got ${synth._effects.length}`);
});

// Test 7: Schedule and cycle
runTest('Schedule and cycle', () => {
  sequencer.cycle(16);
  console.assert(sequencer.getPatternLength() === 16, 'Pattern length should be 16');
  
  sequencer.clearSchedule();
  sequencer.schedule('test1', 0, () => console.log('Beat 0'));
  sequencer.schedule('test2', 4, () => console.log('Beat 4'));
  
  const scheduled = sequencer.listScheduled();
  console.assert(scheduled.length === 2, `Should have 2 scheduled events, got ${scheduled.length}`);
  console.assert(scheduled[0].beat === 0, 'First event should be on beat 0');
  console.assert(scheduled[1].beat === 4, 'Second event should be on beat 4');
  console.log('Scheduling works correctly');
});

// Test 8: Named event replacement
runTest('Named event replacement', () => {
  sequencer.clearSchedule();
  sequencer.schedule('kick', 0, () => console.log('Kick 1'));
  sequencer.schedule('kick', 0, () => console.log('Kick 2'));
  
  const scheduled = sequencer.listScheduled();
  console.assert(scheduled.length === 1, 'Should have only 1 event after replacement');
  console.assert(scheduled[0].id === 'kick', 'Event should have id "kick"');
  console.log('Named events are replaced correctly');
});

console.log('\n=== Test Summary ===');
console.log('All tests completed. Check output above for results.');
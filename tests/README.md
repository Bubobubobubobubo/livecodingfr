# Test Suite

This directory contains comprehensive unit tests for the sequencer core functionality.

## Structure

- `setup.js` - Test environment setup with mocked dependencies
- `unit/sequencer/` - Sequencer unit tests

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with UI
pnpm test:ui

# Run specific test file
pnpm test tests/unit/sequencer/cycle.test.js
```

## Sequencer Tests

### cycle.test.js
Tests the `cycle()` function:
- Valid range validation (1-32)
- Error handling for out of range values
- Pattern length updates

### schedule.test.js
Tests the `schedule()` and `clearSchedule()` functions:
- Named vs anonymous events
- Event replacement for named events
- Beat validation
- Callback wrapping and error handling
- Clear schedule functionality

### synth-factory.test.js
Tests synth factory functions (`sine()`, `saw()`, `square()`, `tri()`):
- Default parameters
- Method chaining
- Duration handling
- Prevention of multiple plays

### effects-chain.test.js
Tests effects chain functionality:
- Effect method additions to chain
- Parameter storage
- Chain order preservation
- No side effects during chaining
- Integration with all waveform types

## Mocking

The test suite uses comprehensive mocks for:
- ToneJS audio library
- AudioClock
- Web Audio API
- Browser environment

This allows tests to run in Node.js without browser dependencies.
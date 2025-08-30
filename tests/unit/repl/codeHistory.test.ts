import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CodeHistory } from '../../../src/lib/components/REPL/codeHistory';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('CodeHistory', () => {
  let codeHistory: CodeHistory;

  beforeEach(() => {
    // Clear localStorage mock
    localStorageMock.clear();
    vi.clearAllMocks();
    codeHistory = new CodeHistory();
  });

  describe('addToHistory', () => {
    it('should add code to history', () => {
      codeHistory.addToHistory('console.log("hello")');
      
      expect(codeHistory.getHistoryLength()).toBe(1);
      expect(codeHistory.getCurrentIndex()).toBe(1);
    });

    it('should not add empty code', () => {
      codeHistory.addToHistory('');
      codeHistory.addToHistory('   ');
      
      expect(codeHistory.getHistoryLength()).toBe(0);
    });

    it('should not add duplicate consecutive entries', () => {
      const code = 'console.log("hello")';
      codeHistory.addToHistory(code);
      codeHistory.addToHistory(code);
      
      expect(codeHistory.getHistoryLength()).toBe(1);
    });

    it('should maintain max history size', () => {
      // Add 25 entries (exceeds default max of 20)
      for (let i = 0; i < 25; i++) {
        codeHistory.addToHistory(`console.log(${i})`);
      }
      
      expect(codeHistory.getHistoryLength()).toBe(20);
    });

    it('should save to localStorage', () => {
      codeHistory.addToHistory('test code');
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'repl-code-history',
        JSON.stringify(['test code'])
      );
    });
  });

  describe('navigation', () => {
    beforeEach(() => {
      codeHistory.addToHistory('first');
      codeHistory.addToHistory('second');
      codeHistory.addToHistory('third');
    });

    describe('getPrevious', () => {
      it('should return previous code', () => {
        expect(codeHistory.getPrevious()).toBe('third');
        expect(codeHistory.getPrevious()).toBe('second');
        expect(codeHistory.getPrevious()).toBe('first');
      });

      it('should return null when at beginning', () => {
        codeHistory.getPrevious(); // third
        codeHistory.getPrevious(); // second
        codeHistory.getPrevious(); // first
        
        expect(codeHistory.getPrevious()).toBeNull();
      });

      it('should return null for empty history', () => {
        // Create a completely fresh instance without any data
        localStorageMock.clear();
        vi.clearAllMocks();
        const emptyHistory = new CodeHistory();
        expect(emptyHistory.getPrevious()).toBeNull();
      });
    });

    describe('getNext', () => {
      it('should return next code after going back', () => {
        codeHistory.getPrevious(); // third
        codeHistory.getPrevious(); // second
        
        expect(codeHistory.getNext()).toBe('third');
      });

      it('should return null when at end', () => {
        expect(codeHistory.getNext()).toBeNull();
      });
    });

    describe('resetNavigation', () => {
      it('should reset to end of history', () => {
        codeHistory.getPrevious(); // third
        codeHistory.getPrevious(); // second
        
        codeHistory.resetNavigation();
        
        expect(codeHistory.getCurrentIndex()).toBe(3);
        expect(codeHistory.getNext()).toBeNull();
      });
    });
  });

  describe('localStorage integration', () => {
    it('should load history from localStorage on initialization', () => {
      const savedHistory = ['saved1', 'saved2'];
      localStorageMock.setItem('repl-code-history', JSON.stringify(savedHistory));
      
      const newHistory = new CodeHistory();
      
      expect(newHistory.getHistoryLength()).toBe(2);
      expect(newHistory.getCurrentIndex()).toBe(2);
    });

    it('should handle corrupt localStorage data gracefully', () => {
      localStorageMock.setItem('repl-code-history', 'invalid json');
      
      const newHistory = new CodeHistory();
      
      expect(newHistory.getHistoryLength()).toBe(0);
      expect(newHistory.getCurrentIndex()).toBe(-1);
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      const newHistory = new CodeHistory();
      
      expect(newHistory.getHistoryLength()).toBe(0);
    });
  });

  describe('clearHistory', () => {
    it('should clear all history and reset state', () => {
      codeHistory.addToHistory('test');
      codeHistory.clearHistory();
      
      expect(codeHistory.getHistoryLength()).toBe(0);
      expect(codeHistory.getCurrentIndex()).toBe(-1);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('repl-code-history');
    });
  });
});
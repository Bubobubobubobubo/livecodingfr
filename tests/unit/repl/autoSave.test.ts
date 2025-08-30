import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AutoSave } from '../../../src/lib/components/REPL/autoSave';

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

describe('AutoSave', () => {
  let autoSave: AutoSave;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorageMock.clear();
    vi.clearAllMocks();
    autoSave = new AutoSave();
  });

  afterEach(() => {
    vi.useRealTimers();
    autoSave.destroy();
  });

  describe('saveCode', () => {
    it('should save code after debounce delay', () => {
      const code = 'console.log("hello")';
      autoSave.saveCode(code);
      
      // Should not save immediately
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      
      // Should save after debounce delay
      vi.advanceTimersByTime(500);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('repl-current-code', code);
    });

    it('should debounce multiple rapid saves', () => {
      autoSave.saveCode('first');
      autoSave.saveCode('second');
      autoSave.saveCode('third');
      
      vi.advanceTimersByTime(500);
      
      // Should only save the last one
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('repl-current-code', 'third');
    });

    it('should clear storage for empty code', () => {
      autoSave.saveCode('   '); // Only whitespace
      
      vi.advanceTimersByTime(500);
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('repl-current-code');
    });

    it('should not save when disabled', () => {
      autoSave.setEnabled(false);
      autoSave.saveCode('test');
      
      vi.advanceTimersByTime(500);
      
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('loadCode', () => {
    it('should load saved code from localStorage', () => {
      const savedCode = 'console.log("saved")';
      localStorageMock.setItem('repl-current-code', savedCode);
      
      expect(autoSave.loadCode()).toBe(savedCode);
    });

    it('should return null when no saved code', () => {
      expect(autoSave.loadCode()).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      expect(autoSave.loadCode()).toBeNull();
    });
  });

  describe('hasSavedContent', () => {
    it('should return true when content exists', () => {
      localStorageMock.setItem('repl-current-code', 'some code');
      
      expect(autoSave.hasSavedContent()).toBe(true);
    });

    it('should return false when no content', () => {
      expect(autoSave.hasSavedContent()).toBe(false);
    });

    it('should return false for empty content', () => {
      localStorageMock.setItem('repl-current-code', '   ');
      
      expect(autoSave.hasSavedContent()).toBe(false);
    });
  });

  describe('clearSavedCode', () => {
    it('should remove saved code from localStorage', () => {
      autoSave.clearSavedCode();
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('repl-current-code');
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      expect(() => autoSave.clearSavedCode()).not.toThrow();
    });
  });

  describe('configuration', () => {
    it('should allow custom save key', () => {
      const customAutoSave = new AutoSave('custom-key');
      customAutoSave.saveCode('test');
      
      vi.advanceTimersByTime(500);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('custom-key', 'test');
    });

    it('should allow custom debounce delay', () => {
      autoSave.setDebounceDelay(1000);
      autoSave.saveCode('test');
      
      // Should not save before custom delay
      vi.advanceTimersByTime(500);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      
      // Should save after custom delay
      vi.advanceTimersByTime(500);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should enforce minimum debounce delay', () => {
      autoSave.setDebounceDelay(50); // Below minimum
      autoSave.saveCode('test');
      
      // Should use minimum delay of 100ms
      vi.advanceTimersByTime(99);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe('enable/disable', () => {
    it('should track enabled state', () => {
      expect(autoSave.isAutoSaveEnabled()).toBe(true);
      
      autoSave.setEnabled(false);
      expect(autoSave.isAutoSaveEnabled()).toBe(false);
    });

    it('should clear timeout when disabled', () => {
      autoSave.saveCode('test');
      autoSave.setEnabled(false);
      
      vi.advanceTimersByTime(500);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('quota exceeded handling', () => {
    it('should handle quota exceeded error', () => {
      const quotaError = new DOMException('QuotaExceededError');
      quotaError.code = DOMException.QUOTA_EXCEEDED_ERR;
      
      localStorageMock.setItem.mockImplementation(() => {
        throw quotaError;
      });
      
      autoSave.saveCode('test');
      vi.advanceTimersByTime(500);
      
      // Should attempt to clear history
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('repl-code-history');
    });
  });

  describe('destroy', () => {
    it('should clear timeout on destroy', () => {
      autoSave.saveCode('test');
      autoSave.destroy();
      
      vi.advanceTimersByTime(500);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });
});
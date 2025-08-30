/**
 * Auto-save functionality for REPL code with debouncing and error handling
 */
export class AutoSave {
  private saveKey: string = 'repl-current-code';
  private debounceTimeout: number | null = null;
  private debounceDelay: number = 500; // 500ms delay
  private isEnabled: boolean = true;

  constructor(saveKey?: string) {
    if (saveKey) {
      this.saveKey = saveKey;
    }
  }

  /**
   * Save code to localStorage with debouncing
   * @param code - Code content to save
   */
  saveCode(code: string): void {
    if (!this.isEnabled) return;

    // Clear existing timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Set new debounced save
    this.debounceTimeout = window.setTimeout(() => {
      this.performSave(code);
    }, this.debounceDelay);
  }

  /**
   * Load saved code from localStorage
   * @returns Saved code or null if none exists
   */
  loadCode(): string | null {
    try {
      const saved = localStorage.getItem(this.saveKey);
      return saved;
    } catch (error) {
      console.warn('Failed to load auto-saved code:', error);
      return null;
    }
  }

  /**
   * Clear saved code from localStorage
   */
  clearSavedCode(): void {
    try {
      localStorage.removeItem(this.saveKey);
    } catch (error) {
      console.warn('Failed to clear auto-saved code:', error);
    }
  }

  /**
   * Check if auto-save contains content
   * @returns True if saved content exists
   */
  hasSavedContent(): boolean {
    const saved = this.loadCode();
    return Boolean(saved && saved.trim().length > 0);
  }

  /**
   * Enable or disable auto-save functionality
   * @param enabled - Whether to enable auto-save
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (!enabled && this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  /**
   * Get current auto-save status
   * @returns True if auto-save is enabled
   */
  isAutoSaveEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Set the debounce delay for saving
   * @param delay - Delay in milliseconds
   */
  setDebounceDelay(delay: number): void {
    this.debounceDelay = Math.max(100, delay); // Minimum 100ms
  }

  /**
   * Perform the actual save operation
   * @param code - Code to save
   */
  private performSave(code: string): void {
    try {
      // Only save non-empty content
      const trimmedCode = code.trim();
      if (trimmedCode.length > 0) {
        localStorage.setItem(this.saveKey, code);
      } else {
        // Clear storage if code is empty
        this.clearSavedCode();
      }
    } catch (error) {
      console.warn('Failed to auto-save code:', error);
      
      // If storage is full, try to clear some space
      if (error instanceof DOMException && error.code === DOMException.QUOTA_EXCEEDED_ERR) {
        this.handleStorageQuotaExceeded();
      }
    }
  }

  /**
   * Handle localStorage quota exceeded by clearing old data
   */
  private handleStorageQuotaExceeded(): void {
    try {
      // Clear history data to make space for current code
      const historyKey = 'repl-code-history';
      localStorage.removeItem(historyKey);
      console.warn('Cleared code history to make space for auto-save');
    } catch (error) {
      console.error('Failed to clear storage space:', error);
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }
}
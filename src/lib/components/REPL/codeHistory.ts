/**
 * Manages code execution history with localStorage persistence
 * Provides navigation through previous code snippets
 */
export class CodeHistory {
  private history: string[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 20;
  private storageKey: string = 'repl-code-history';

  constructor() {
    this.loadHistory();
  }

  /**
   * Add a code snippet to history
   * @param code - Code to add to history
   */
  addToHistory(code: string): void {
    // Don't add empty code or duplicates
    const trimmedCode = code.trim();
    if (!trimmedCode || trimmedCode === this.history[this.history.length - 1]) {
      return;
    }

    this.history.push(trimmedCode);
    
    // Keep history size within limit
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }

    this.currentIndex = this.history.length;
    this.saveHistory();
  }

  /**
   * Navigate to previous entry in history
   * @returns Previous code snippet or null if at beginning
   */
  getPrevious(): string | null {
    if (this.history.length === 0 || this.currentIndex <= 0) {
      return null;
    }

    this.currentIndex--;
    return this.history[this.currentIndex];
  }

  /**
   * Navigate to next entry in history
   * @returns Next code snippet or null if at end
   */
  getNext(): string | null {
    if (this.history.length === 0 || this.currentIndex >= this.history.length - 1) {
      return null;
    }

    this.currentIndex++;
    return this.history[this.currentIndex];
  }

  /**
   * Reset history navigation to end
   */
  resetNavigation(): void {
    this.currentIndex = this.history.length;
  }

  /**
   * Get current history index for UI feedback
   * @returns Current position in history
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Get total history length
   * @returns Number of items in history
   */
  getHistoryLength(): number {
    return this.history.length;
  }

  /**
   * Load history from localStorage
   */
  private loadHistory(): void {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.history = JSON.parse(saved);
        this.currentIndex = this.history.length;
      }
    } catch (error) {
      console.warn('Failed to load code history:', error);
      this.history = [];
      this.currentIndex = -1;
    }
  }

  /**
   * Save history to localStorage
   */
  private saveHistory(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.warn('Failed to save code history:', error);
    }
  }

  /**
   * Clear all history
   */
  clearHistory(): void {
    this.history = [];
    this.currentIndex = -1;
    localStorage.removeItem(this.storageKey);
  }
}
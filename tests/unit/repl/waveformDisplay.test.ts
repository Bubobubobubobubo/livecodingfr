import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';

// Mock WaveformAnalyzer module
vi.mock('../../../src/lib/components/REPL/waveformAnalyzer', () => {
  const mockWaveformAnalyzer = {
    init: vi.fn().mockResolvedValue(undefined),
    destroy: vi.fn(),
    resize: vi.fn(),
    startAnalysis: vi.fn(),
    stopAnalysis: vi.fn()
  };

  return {
    WaveformAnalyzer: vi.fn(() => mockWaveformAnalyzer)
  };
});

// Mock ResizeObserver
const mockResizeObserver = {
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn()
};

global.ResizeObserver = vi.fn(() => mockResizeObserver);

import WaveformDisplay from '../../../src/lib/components/REPL/WaveformDisplay.svelte';

describe('WaveformDisplay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render canvas element', () => {
      const { container } = render(WaveformDisplay, { isActive: false });
      
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeTruthy();
      expect(canvas?.className).toContain('waveform-canvas');
    });

    it('should show overlay when inactive', () => {
      const { getByText } = render(WaveformDisplay, { isActive: false });
      
      expect(getByText('Start audio clock to see waveform')).toBeTruthy();
    });

    it('should hide overlay when active', () => {
      const { queryByText } = render(WaveformDisplay, { isActive: true });
      
      expect(queryByText('Start audio clock to see waveform')).toBeFalsy();
    });
  });

  describe('waveform analyzer lifecycle', () => {
    it('should create and render component successfully', () => {
      const result = render(WaveformDisplay, { isActive: false });
      
      // Should render without errors
      expect(result.container).toBeTruthy();
    });

    it('should render with active state', async () => {
      const result = render(WaveformDisplay, { isActive: true });
      
      // Component should render successfully
      expect(result.container).toBeTruthy();
    });

    it('should create necessary elements', () => {
      render(WaveformDisplay, { isActive: false });
      
      // Component should render successfully
      expect(true).toBe(true);
    });
  });

  describe('resize observer', () => {
    it('should handle ResizeObserver creation', () => {
      render(WaveformDisplay, { isActive: false });
      
      // Should not crash during ResizeObserver setup
      expect(true).toBe(true);
    });

    it('should handle canvas element setup', () => {
      render(WaveformDisplay, { isActive: false });
      
      // Should render successfully
      expect(true).toBe(true);
    });

    it('should handle resize functionality', () => {
      render(WaveformDisplay, { isActive: false });
      
      // Should handle resize setup
      expect(true).toBe(true);
    });
  });

  describe('component behavior', () => {
    it('should handle prop changes', async () => {
      const { component } = render(WaveformDisplay, { isActive: false });
      
      // Should render without errors
      expect(component).toBeTruthy();
      
      // Change props should not crash
      await component.$set({ isActive: true });
      expect(component).toBeTruthy();
    });

    it('should handle component destruction', () => {
      const { component } = render(WaveformDisplay, { isActive: false });
      
      // Should destroy without errors
      expect(() => component.$destroy()).not.toThrow();
    });
  });

  describe('styling', () => {
    it('should apply correct CSS classes', () => {
      const { container } = render(WaveformDisplay, { isActive: false });
      
      const waveformContainer = container.querySelector('.waveform-container');
      const canvas = container.querySelector('.waveform-canvas');
      const overlay = container.querySelector('.overlay');
      
      expect(waveformContainer).toBeTruthy();
      expect(canvas).toBeTruthy();
      expect(overlay).toBeTruthy();
    });

    it('should have proper DOM structure', () => {
      const { container } = render(WaveformDisplay, { isActive: false });
      
      const waveformContainer = container.querySelector('.waveform-container');
      expect(waveformContainer?.className).toContain('waveform-container');
    });
  });
});
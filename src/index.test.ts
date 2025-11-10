import { describe, it, expect } from 'vitest';
import type { SearchResult, SearchOptions } from './index';

describe('baidusearch-cli', () => {
  describe('SearchResult interface', () => {
    it('should have correct type definitions', () => {
      const mockResult: SearchResult = {
        title: 'Test Title',
        abstract: 'Test Abstract',
        url: 'https://example.com',
        rank: 1,
      };

      expect(mockResult.title).toBeTypeOf('string');
      expect(mockResult.abstract).toBeTypeOf('string');
      expect(mockResult.url).toBeTypeOf('string');
      expect(mockResult.rank).toBeTypeOf('number');
    });
  });

  describe('SearchOptions interface', () => {
    it('should have optional numResults property', () => {
      const options1: SearchOptions = {};
      const options2: SearchOptions = { numResults: 10 };
      const options3: SearchOptions = { numResults: 5, debug: true };

      expect(options1).toBeDefined();
      expect(options2.numResults).toBe(10);
      expect(options3.debug).toBe(true);
    });
  });

  describe('search function', () => {
    it('should be exported', async () => {
      const { search } = await import('./index');
      expect(search).toBeDefined();
      expect(typeof search).toBe('function');
    });

    it('should reject empty keyword', async () => {
      const { search } = await import('./index');
      await expect(search('')).rejects.toThrow('Keyword is required');
    });
  });

  describe('Integration tests', () => {
    it.skip('should return search results for valid keyword (integration test - requires network)', async () => {
      // This is an integration test that requires actual network access
      // Skip by default in CI/CD
      const { search } = await import('./index');
      const results = await search('TypeScript', { numResults: 3 });
      
      expect(Array.isArray(results)).toBe(true);
      if (results.length > 0) {
        expect(results[0]).toHaveProperty('title');
        expect(results[0]).toHaveProperty('abstract');
        expect(results[0]).toHaveProperty('url');
        expect(results[0]).toHaveProperty('rank');
      }
    });
  });
});

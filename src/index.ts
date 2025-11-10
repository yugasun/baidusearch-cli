import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

export interface SearchResult {
  title: string;
  abstract: string;
  url: string;
  rank: number;
}

export interface SearchOptions {
  numResults?: number;
  debug?: boolean;
}

const ABSTRACT_MAX_LENGTH = 300;

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/49.0.2623.108 Chrome/49.0.2623.108 Safari/537.36',
  'Mozilla/5.0 (Windows; U; Windows NT 5.1; pt-BR) AppleWebKit/533.3 (KHTML, like Gecko) QtWeb Internet Browser/3.7 http://www.QtWeb.net',
  'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.2 (KHTML, like Gecko) ChromePlus/4.0.222.3 Chrome/4.0.222.3 Safari/532.2',
  'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.4pre) Gecko/20070404 K-Ninja/2.1.3',
  'Mozilla/5.0 (Future Star Technologies Corp.; Star-Blade OS; x86_64; U; en-US) iNet Browser 4.7',
  'Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201',
  'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080414 Firefox/2.0.0.13 Pogo/2.0.0.13.6866',
];

const HEADERS = {
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
  Referer: 'https://www.baidu.com/',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.9',
};

const BAIDU_HOST_URL = 'https://www.baidu.com';
const BAIDU_SEARCH_URL = 'https://www.baidu.com/s?ie=utf-8&tn=baidu&wd=';

class BaiduSearch {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      headers: HEADERS,
      timeout: 30000,
    });
  }

  /**
   * Search with keyword
   * @param keyword - Search keyword
   * @param options - Search options
   * @returns Promise of search results
   */
  async search(keyword: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    const { numResults = 10, debug = false } = options;

    if (!keyword) {
      throw new Error('Keyword is required');
    }

    const results: SearchResult[] = [];
    let page = 1;
    let nextUrl: string | null = BAIDU_SEARCH_URL + encodeURIComponent(keyword);

    while (results.length < numResults && nextUrl) {
      const { data, next } = await this.parseHtml(nextUrl, results.length, debug);

      if (data && data.length > 0) {
        results.push(...data);
        if (debug) {
          console.log(`---searching[${keyword}], finish parsing page ${page}, results number=${data.length}`);
          data.forEach((d) => console.log(JSON.stringify(d)));
        }
      }

      if (!next) {
        if (debug) {
          console.log('Already searched the last page.');
        }
        break;
      }

      nextUrl = next;
      page++;
    }

    if (debug) {
      console.log(`\n---search [${keyword}] finished. total results number=${results.length}!`);
    }

    return results.slice(0, numResults);
  }

  /**
   * Parse HTML content
   * @param url - URL to parse
   * @param rankStart - Starting rank number
   * @param debug - Debug flag
   * @returns Promise of parsed data and next page URL
   */
  private async parseHtml(
    url: string,
    rankStart: number = 0,
    debug: boolean = false
  ): Promise<{ data: SearchResult[]; next: string | null }> {
    try {
      const response = await this.client.get(url);
      const $ = cheerio.load(response.data);

      const results: SearchResult[] = [];
      const divContents = $('#content_left').children();

      divContents.each((_, element) => {
        const $div = $(element);
        const classList = $div.attr('class')?.split(' ') || [];

        if (!classList.includes('c-container')) {
          return;
        }

        let title = '';
        let resultUrl = '';
        let abstract = '';

        try {
          if (classList.includes('xpath-log')) {
            const h3 = $div.find('h3');
            if (h3.length) {
              title = h3.text().trim();
              resultUrl = h3.find('a').attr('href')?.trim() || '';
            } else {
              const textLines = $div.text().trim().split('\n');
              title = textLines[0];
              const anchor = $div.find('a');
              if (anchor.length) {
                resultUrl = anchor.attr('href')?.trim() || '';
              }
            }

            const abstractDiv = $div.find('div.c-abstract');
            if (abstractDiv.length) {
              abstract = abstractDiv.text().trim();
            } else {
              const firstDiv = $div.find('div').first();
              if (firstDiv.length) {
                abstract = firstDiv.text().trim();
              } else {
                const textLines = $div.text().trim().split('\n');
                abstract = textLines.slice(1).join('\n').trim();
              }
            }
          } else if (classList.includes('result')) {
            const h3 = $div.find('h3');
            if (h3.length) {
              title = h3.text().trim();
              resultUrl = h3.find('a').attr('href')?.trim() || '';
            } else {
              const textLines = $div.text().trim().split('\n');
              title = textLines[0];
              resultUrl = $div.find('a').attr('href')?.trim() || '';
            }

            const abstractDiv = $div.find('div.c-abstract');
            if (abstractDiv.length) {
              abstract = abstractDiv.text().trim();
            } else {
              const firstDiv = $div.find('div').first();
              if (firstDiv.length) {
                abstract = firstDiv.text().trim();
              } else {
                const textLines = $div.text().trim().split('\n');
                abstract = textLines.slice(1).join('\n').trim();
              }
            }
          } else {
            const tpl = $div.attr('tpl');
            const h3 = $div.find('h3');

            if (h3.length) {
              title = h3.text().trim();
              resultUrl = h3.find('a').attr('href')?.trim() || '';
            } else if ($div.contents().length > 0) {
              title = $div.contents().first().text().trim();
              const anchor = $div.find('a');
              if (anchor.length) {
                resultUrl = anchor.attr('href')?.trim() || '';
              }
            }

            const abstractDiv = $div.find('div.c-abstract');
            if (abstractDiv.length) {
              abstract = abstractDiv.text().trim();
            } else {
              const firstDiv = $div.find('div').first();
              if (firstDiv.length) {
                abstract = firstDiv.text().trim();
              } else {
                abstract = $div.text().trim();
              }
            }
          }

          if (!title) {
            return;
          }

          if (ABSTRACT_MAX_LENGTH && abstract.length > ABSTRACT_MAX_LENGTH) {
            abstract = abstract.substring(0, ABSTRACT_MAX_LENGTH);
          }

          rankStart++;
          results.push({
            title,
            abstract,
            url: resultUrl,
            rank: rankStart,
          });
        } catch (e) {
          if (debug) {
            console.error('Error parsing element:', e);
          }
        }
      });

      // Find next page button
      const nextButtons = $('a.n');
      let nextUrl: string | null = null;

      if (nextButtons.length > 0) {
        const lastButton = nextButtons.last();
        const buttonText = lastButton.text();

        if (!buttonText.includes('上一页')) {
          const href = lastButton.attr('href');
          if (href) {
            nextUrl = BAIDU_HOST_URL + href;
          }
        }
      }

      return { data: results, next: nextUrl };
    } catch (e) {
      if (debug) {
        console.error('Error parsing HTML:', e);
      }
      return { data: [], next: null };
    }
  }
}

// Create singleton instance
const baidusearch = new BaiduSearch();

/**
 * Search Baidu with keyword
 * @param keyword - Search keyword
 * @param options - Search options
 * @returns Promise of search results
 */
export async function search(keyword: string, options?: SearchOptions): Promise<SearchResult[]> {
  return baidusearch.search(keyword, options);
}

export default baidusearch;

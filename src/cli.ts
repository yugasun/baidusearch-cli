#!/usr/bin/env node

import { search } from './index';

const DEFAULT_KEYWORD = 'Amazing Coder';
const DEFAULT_NUM_RESULTS = 10;
const DEFAULT_DEBUG = false;

const PROMPT = `
baidusearch-cli: not enough arguments
[0]keyword: keyword what you want to search
[1]num_results: number of results (default: 10)
[2]debug: debug switch, 0-close, 1-open (default: 0)

Examples:
  baidusearch-cli NBA
  baidusearch-cli NBA 6
  baidusearch-cli NBA 8 1
`;

async function run() {
  const args = process.argv.slice(2);
  let keyword = '';
  let numResults = DEFAULT_NUM_RESULTS;
  let debug = DEFAULT_DEBUG;

  if (args.length === 0) {
    console.log(PROMPT);
    keyword = DEFAULT_KEYWORD;
    console.log(`Using default keyword: ${keyword}`);
  } else if (args.length === 1) {
    keyword = args[0];
  } else if (args.length === 2) {
    keyword = args[0];
    numResults = parseInt(args[1], 10) || DEFAULT_NUM_RESULTS;
  } else if (args.length >= 3) {
    keyword = args[0];
    numResults = parseInt(args[1], 10) || DEFAULT_NUM_RESULTS;
    debug = parseInt(args[2], 10) === 1;
  }

  if (!keyword) {
    keyword = DEFAULT_KEYWORD;
  }

  console.log(`Start search: [${keyword}], expected number of results:[${numResults}].`);

  try {
    const results = await search(keyword, { numResults, debug });

    if (results && results.length > 0) {
      console.log(`\nsearch results: (total[${results.length}] items.)`);
      results.forEach((res) => {
        console.log(`${res.rank}. ${res.title}\n   ${res.abstract}\n   ${res.url}\n`);
      });
    } else {
      console.log(`start search: [${keyword}] failed or no results found.`);
    }
  } catch (error) {
    console.error(`Error during search: ${error}`);
    process.exit(1);
  }
}

run();

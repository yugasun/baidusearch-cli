const { search } = require('../dist/index');

async function main() {
  try {
    console.log('Searching for "Node.js"...\n');
    
    const results = await search('Node.js', {
      numResults: 5,
      debug: false
    });

    console.log(`Found ${results.length} results:\n`);
    
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      console.log(`   ${result.abstract.substring(0, 100)}...`);
      console.log(`   ${result.url}\n`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();

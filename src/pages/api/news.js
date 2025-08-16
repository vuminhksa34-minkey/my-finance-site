import Parser from 'rss-parser';

export async function GET() {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL('https://vnexpress.net/rss/kinh-doanh.rss');
    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch RSS feed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

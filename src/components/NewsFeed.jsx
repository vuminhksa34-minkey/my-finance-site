import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

const NewsFeed = () => {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const parser = new Parser();
    const fetchFeed = async () => {
      try {
        // Note: Some RSS feeds may not have the correct CORS headers.
        // If you encounter issues, you might need to use a CORS proxy.
        const feed = await parser.parseURL('https://vnexpress.net/rss/kinh-doanh.rss');
        setFeed(feed);
      } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
      }
    };

    fetchFeed();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!feed) {
    return <p>Đang tải tin tức...</p>;
  }

  return (
    <ul className="space-y-4">
      {feed.items.slice(0, 5).map((item, index) => (
        <li key={index} className="border-b border-gray-700 pb-4">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold">
            {item.title}
          </a>
          <p className="text-gray-400 text-sm mt-1">
            {item.contentSnippet}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default NewsFeed;

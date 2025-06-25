import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const BASE_URL = `https://url-shortner-backend-sigma-black.vercel.app`;
function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    try {
      const res = await axios.post(`${BASE_URL}/api/shorten`, { originalUrl });

      // console.log("previous urls: ", urls)
      // console.log("New urls from API", res.data)

      const combined = [...urls, res.data];

      // console.log('Combined list before filtering', combined)

      // To remove duplicates from an array of objects based on specific property... Here used (id)
      // Not (set) because it only works on primitive types (like strings or numbers). For objects we must manually check properties using .filter() and .findIndex()
      // self is the whole array (combined).
      // self.findIndex(...) finds the first index where (shortUrl) id matches the current item.id.
      // If the current indx is equal to the first index, keep it. 

      const uniqueUrls = combined.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
      );
      // console.log("Unique urls after filtering", uniqueUrls);

      setUrls(uniqueUrls);
      setOriginalUrl('');

    } catch (err) {
      alert('Invalid URL or server error');
    }
  };

  // const getUrls = () => {
  //   axios.get(`${BASE_URL}/api/urls`).then(res => {
  //     const urls = (res?.data?.urls || []).map(url => ({ shortUrl: `${BASE_URL}/${url.shortId}` }))
  //     setUrls(urls);
  //   }).catch(ex => console.log("error occured", ex))
  // }

  // useEffect(() => {
  //   getUrls()
  // }, [])

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="url"
          placeholder="Enter a URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 15px' }}>Shorten</button>
      </form>

      <ul>
        {urls.map((item, index) => (
          <li key={index}>
            <a
              href={item.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            >
              {item.shortUrl}
            </a>
          </li>
        ))}
      </ul>

    </div>
  );


}

export default App;

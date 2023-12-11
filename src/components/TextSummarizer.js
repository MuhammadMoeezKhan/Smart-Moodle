import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextSummarizer = ({ sharedText, onSummarized }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const summarizeText = async () => {
      setIsLoading(true);
      setError(null);

      const encodedParams = new URLSearchParams();
      encodedParams.set('text', sharedText);
      encodedParams.set('sentnum', '1');

      const options = {
        method: 'POST',
        url,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'textanalysis-text-summarization.p.rapidapi.com',
        },
        data: encodedParams,
      };

      try {
        console.log('Request Payload:', encodedParams.toString());

        const response = await axios.request(options);

        console.log('API Response:', response.data);

        if (!response.data.sentences || response.data.sentences.length === 0) {
          throw new Error('API response does not contain a valid summary.');
        }

        // Join the sentences into a paragraph
        const summary = response.data.sentences.join(' ');

        onSummarized(summary);
      } catch (error) {
        console.error('Error in summarizeText:', error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }

        // Log the specific error message from the API response
        setError(error.response?.data || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    if (sharedText) {
      summarizeText();
    }
  }, [sharedText, onSummarized]);

  if (isLoading) {
    return <p>Summarizing...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return null;
};

export default TextSummarizer;

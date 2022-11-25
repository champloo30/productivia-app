import React, { useState } from 'react'
import './wordOfDay.scss'
import axios from 'axios'

export default function WordOfDay() {
  const [response, setResponse] = useState(null)

  const fetchWords = async function words() {
    try {
      const res = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/`, {
        headers: {
          'X-RapidAPI-Key': 'ce82a8b1bamshc29393d87dfd144p1e9ad2jsn1f2ae779796f',
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        },
        params: {random: 'true'},
      })
      setResponse(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  console.log(response);

  return (
    <div className='wordofday'>
      <div className="wordofday-container">
        <button onClick={() => fetchWords()}>Get Random Word</button>
        <div className="word-info">
          {response ? 
            <div>
              <p>{response.word}</p>
              {response.syllables ? <p>{response.syllables.list}</p> : null}
              {response.pronunciation ? <p>{response.pronunciation.all}</p> : null}
              {response.results ? <p>{response.results[0].definition}</p> : null}
              {response.results ? <p>{response.results[0].partOfSpeech}</p> : null}
              {response.results ? <p>{response.results[0].synonyms}</p> : null}
            </div>
          : null}
        </div>
      </div>
      
      
      
    </div>
  )
}

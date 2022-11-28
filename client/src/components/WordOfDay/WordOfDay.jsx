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

  const noDefiniton = "This didn't come with a definition. Please try again!"
  
  return (
    <div className='wordofday'>
      <div className="wordofday-container">
        <h1>Word of the Day</h1>
        <button className='btn' onClick={() => fetchWords()}>Get Random Word</button>
        <div className="word-info">
          {response ? 
            <div className='info-container'>
              <p className='word'>{response.word}</p>
              {response.results ? <p className='part-of-speech'>{response.results[0].partOfSpeech}</p> : null}
              <div className="syllables-list">
                {response.syllables ? 
                  response.syllables.list.map((syllable) => 
                    <p className='syllables' id={syllable}>{syllable}</p>
                  ) 
                : null}
              </div>
              {response.results ? <p className='definition'>{response.results[0].definition}</p> : <p className='no-definition'>{noDefiniton}</p>}
            </div>
          : null}
        </div>
      </div>
      
      
      
    </div>
  )
}

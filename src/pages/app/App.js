
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import narutoImg from '../../images/naruto.png'
import { Quotes } from '../../components/quotes';
import { getQuote } from '../../services'
import jutsuSound from '../../sounds/jutso.mp3'

const audio = new Audio(jutsuSound)

export function App() {
  const isMounted = useRef(true)
  //console.log(isMounted)

  const [quoteState, setQuoteState] = useState({
    quote: 'loading quote...',
    speaker: 'loading speaker...'
  })

  const onUpdate = async () => {
    //console.log(isMounted.current)
    if(!isMounted.current){
      audio.play()
    }
    const quote = await getQuote()
    setQuoteState(quote)
  
  }
  useEffect(() => {
    onUpdate()
    isMounted.current = false
    // return () => {
    // }
  }, [])


  return (

    <Content>
      <Quotes
        // quote={quoteState.quote}
        // speaker={quoteState.speaker}
        {...quoteState}
        onUpdate={onUpdate}
      />
      <NarutoImg src={narutoImg} alt="Naruto with a kunai" />
    </Content>

  );
}

const Content = styled.div`
  height: 100vh;
  padding: 0 50px;
  display: flex;
  jutify-content: center;
  align-items: center;
  
`

const NarutoImg = styled.img`
  max-width: 50vw;
  align-self: flex-end;
`
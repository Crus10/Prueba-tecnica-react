import React, { useEffect, useState } from 'react'
import { useFetch } from './useFetch'

export function App () {
  const { data, loading, error } = useFetch('https://catfact.ninja/fact')

  const firstWord = data?.fact.split(' ')[0]

  const [dataImage, setDataImage] = useState(null)
  const [loadingImage, setLoadingImage] = useState(true)
  const [errorImage, setErrorImage] = useState(null)

  useEffect(() => {
    if (firstWord) {
      setLoadingImage(true)
      fetch(`https://cataas.com/cat/says/${firstWord}`)
        .then((dataImage) => setDataImage(dataImage))
        .catch((errorImage) => setErrorImage(errorImage))
        .finally(() => setLoadingImage(false))
    }
  }, [firstWord])

  return (
    <>
      <h1> 😼 App de gatitos uwu 😼</h1> <br />

      <button onClick={() => window.location.reload()}> NUEVO FACT DE GATOS  </button>
      <h2> {data?.fact}
        {error && <div>Error:{error} </div>}
        {loading && <div>Loading...</div>}
      </h2>
      {firstWord && <h3>La primera palabra es : {firstWord}</h3>}

      {loadingImage && <div>Loading...</div>}
      {errorImage && <div>Error: {errorImage.message}</div>}
      {dataImage && (

        <div>
          <img src={dataImage.url} alt='Imagen de gatito' />
        </div>
      )}
    </>
  )
}

import { useEffect, useState } from "react";
import { CAT_PREFIX_IMAGE_URL } from '../constants'

/**
 * * Image URL request with the second API, receiving the text to look for
 * @fact It will be the text obtained from the first API
 */
export function useCatImage({ fact }) {

  const [imgUrl, setImageUrl] = useState();

  useEffect(() => {
    if (!fact) return;

    const firstWord = fact.split(' ')[0];

    fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=60&fontColor=white&json=true`)
      .then(result => result.json())
      .then(data => {
        const { _id } = data;
        setImageUrl(`${_id}/says/${firstWord}?fontSize=60&fontColor=white`)
      });
  }, [fact]);

  return {
    imgUrl: `${CAT_PREFIX_IMAGE_URL}${imgUrl}`
  };
}
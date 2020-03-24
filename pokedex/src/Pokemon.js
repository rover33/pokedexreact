import React, {useState, useEffect} from 'react';


let Pokemon = () => {
  let [pokemon, setPokemon] = useState([]);
  // let [img, setImg] = useState(null);
  // let [num, setNumb] = useState([])


  useEffect(() => {
    let isCurrent = true;
    fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)

      .then(res => res.json())
      .then(res => {
        if (isCurrent) 
        setPokemon(res.pokemon)
        // setNumb(res.number)
        // setImg(res.img)
      })
      .catch(() => {
        console.log("stop it");
      });
      return () => {
        isCurrent = false;
      };
    }, [pokemon]);

  let renderPokedex = () => {
    return (
    <ul>
      {pokemon.map(el => (
      <li key={el.id}>
        Name: {el.name}
        <br />
        Pokedex Number: {el.num}
        <br />
        Pokemon Type: {el.type}
        <br />
        Weakness: {el.weaknesses}
        <br />
        <img src={el.img} />
        </li>
      ))}
    </ul>
  )}

  return (
    <div>
       <input
        type="search"
        placeholder="pokemon"
        onChange={e => {
          setPokemon(e.target.value);
      }}
    />
    {renderPokedex()}
    {/* Hello, {pokemon}!
      {img && <img src={img} />}
      {num && <div>{num}</div>} */}
    </div>
  );
};

export default Pokemon










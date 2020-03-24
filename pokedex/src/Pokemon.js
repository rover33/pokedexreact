import React, {useState, useEffect} from 'react';
let Pokemon = () => {
  let [pokemon, setPokemon] = useState([]);
  let [searchString, setSearchString] = useState('');
  let [elementObj, setElementObj] = useState({fire: false, water: false, poison:false, grass:false})

  useEffect(() => {
    let isCurrent = true;
    fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
      .then(res => res.json())
      .then(res => {
        if (isCurrent) setPokemon(res.pokemon)
      })
      .catch(() => {
        console.log("stop it");
      });
      return () => {
        isCurrent = false;
      };
    }, [pokemon]);


  let checkboxClick = e => {
    setElementObj(elementObj);
    console.log(elementObj)
    e.stopPropagation();
  }

  let onChange = e => setSearchString(e.target.value);

  let renderPokedex = () => {
    let tempArr = []
    if (searchString.length <= 0) {
      tempArr = pokemon
    } else {
      for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name.toLowerCase().includes(searchString)) {
          tempArr.push(pokemon[i])
        }
        if (checkboxClick && pokemon[i].type.includes(elementObj)) {
          tempArr.push(pokemon[i])
        }
    }
  }


    return <ul>
      {tempArr.map(el => (
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
  }

  return (
    <div>
       <input
        type="search"
        placeholder="pokemon"
        onChange={onChange}
    />
    <br />
    <br />
    <div>
      <label>Pokemon Element Type</label>
      <br/>
      <input type="checkbox" id="grass" name="grass" onClick={checkboxClick}/>
      <label htmlFor="grass">Grass</label>
      <input type="checkbox" id="poison" name="poison" onClick={checkboxClick}/>
      <label htmlFor="posion">Poison</label>
      <input type="checkbox" id="water" name="water" onClick={checkboxClick}/>
      <label htmlFor="water">Water</label>
      <input type="checkbox" id="fire" name="fire" onClick={checkboxClick}/>
      <label htmlFor="fire">Fire</label>
    </div>
    <br />
    <br />
    {/* <div>
      <label>Pokemon Weakness</label>
      <br />
      <input type="checkbox" id="weakgrass" name="weakgrass" onClick={checkboxClick()}/>
      <label for="weakgrass">Grass</label>
      <input type="checkbox" id="weakpoison" name="weakpoison"/>
      <label for="weakposion">Poison</label>
      <input type="checkbox" id="weakwater" name="weakwater"/>
      <label for="weakwater">Water</label>
      <input type="checkbox" id="weakfire" name="weakfire"/>
      <label for="weakfire">Fire</label>
    </div> */}
    {renderPokedex()}
    </div>
  );
};
export default Pokemon
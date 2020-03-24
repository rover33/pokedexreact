import React, {useState, useEffect} from 'react';

let Pokemon = () => {
  let [pokemon, setPokemon] = useState([]);
  let [searchString, setSearchString] = useState('');
  let [elementObj, setElementObj] = useState(
      {fire: false, water: false, poison:false, grass:false, weakgrass: false, weakfire: false, weakwater: false, weakpoison :false}
    )

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

  
  let checkboxClick = (e) => {
    elementObj[e.target.name] = !elementObj[e.target.name]
    setElementObj(elementObj);
    console.log(e.target.name)
  }

  let onChange = e => setSearchString(e.target.value);

  let checkIfType = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item));
  };

  let renderPokedex = () => {
    let { fire, grass, poison, water, weakfire, weakwater, weakpoison, weakgrass } = elementObj
    let tempArr = []
    let typeArr = []
    if (fire) typeArr.push('Fire')
    if (grass) typeArr.push('Grass')
    if (poison) typeArr.push('Poison')
    if (water) typeArr.push('Water')
    if (weakfire) typeArr.push("Fire")
    if (weakgrass) typeArr.push("Grass")
    if (weakwater) typeArr.push("Water")
    if (weakpoison) typeArr.push("Poison")
    if (searchString.length <= 0) {
      tempArr = pokemon
    } else {
      for (let i = 0; i < pokemon.length; i++) {
        console.log(pokemon[i])
        if (pokemon[i].name.toLowerCase().includes(searchString)) {
          tempArr.push(pokemon[i])
        }  else if (pokemon[i].name.toLowerCase().includes(searchString) && checkIfType(typeArr, pokemon[i].type)) {
          tempArr.push(pokemon[i])
        } else if (pokemon[i].name.toLowerCase().includes(searchString) && checkIfType(typeArr, pokemon[i].weaknesses)) {
            tempArr.push(pokemon[i])
        } else if (pokemon[i].name.toLowerCase().includes(searchString) && checkIfType(typeArr, pokemon[i].type) && checkIfType(typeArr, pokemon[i].weaknesses)) {
          tempArr.push(pokemon[i])
        } else if (pokemon[i].type.includes(elementObj) && checkIfType(typeArr, pokemon[i].weaknesses)) {
          tempArr.push(pokemon[i])
        } else if (pokemon[i].type.includes(elementObj) && checkIfType(typeArr, pokemon[i].weaknesses)) {
          tempArr.push(pokemon[i])
        } else if (pokemon[i].type.includes(elementObj)) {
          tempArr.push(pokemon[i])
        } else if (pokemon[i].weaknesses.includes(elementObj)) {
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
     <div>
      <label>Pokemon Weakness</label>
      <br />
      <input type="checkbox" id="weakgrass" name="weakgrass" onClick={checkboxClick}/>
      <label htmlFor="weakgrass">Grass</label>
      <input type="checkbox" id="weakpoison" name="weakpoison" onClick={checkboxClick}/>
      <label htmlFor="weakposion">Poison</label>
      <input type="checkbox" id="weakwater" name="weakwater" onClick={checkboxClick}/>
      <label htmlFor="weakwater">Water</label>
      <input type="checkbox" id="weakfire" name="weakfire" onClick={checkboxClick}/>
      <label htmlFor="weakfire">Fire</label>
    </div>
    {renderPokedex()}
    </div>
  );
};

export default Pokemon
import React, { useState, useEffect } from "react";
import "./Pokemon.css";

let Pokemon = () => {
  let [pokemon, setPokemon] = useState([]);
  let [searchString, setSearchString] = useState("");
  let [elementObj, setElementObj] = useState({
    fire: false,
    water: false,
    poison: false,
    grass: false
  });
  let [elementWeakness, setElementWeakness] = useState({
    weakgrass: false,
    weakfire: false,
    weakwater: false,
    weakpoison: false
  });

  useEffect(() => {
    let isCurrent = true;
    fetch(
      `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
    )
      .then(res => res.json())
      .then(res => {
        if (isCurrent) setPokemon(res.pokemon);
      })
      .catch(() => {
        console.log("stop it");
      });
    return () => {
      isCurrent = false;
    };
  }, []);

  let checkboxTypeClick = e => {
    elementObj[e.target.name] = !elementObj[e.target.name];
    setElementObj(elementObj);
    setPokemon(pokemon);
  };

  let checkboxWeaknessClick = e => {
    elementWeakness[e.target.name] = !elementWeakness[e.target.name];
    setElementWeakness(elementWeakness);
    setPokemon(pokemon);
  };

  let onChange = e => setSearchString(e.target.value);

  let checkIfType = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item));
  };

  let renderPokedex = () => {
    let { fire, grass, poison, water } = elementObj;
    let { weakfire, weakwater, weakpoison, weakgrass } = elementWeakness;
    let tempArr = new Set();
    let typeArr = [];
    let weakArr = [];
    if (fire) typeArr.push("Fire");
    if (grass) typeArr.push("Grass");
    if (poison) typeArr.push("Poison");
    if (water) typeArr.push("Water");
    if (weakfire) weakArr.push("Fire");
    if (weakgrass) weakArr.push("Grass");
    if (weakwater) weakArr.push("Water");
    if (weakpoison) weakArr.push("Poison");
    if (
      typeArr.length <= 0 &&
      weakArr.length <= 0 &&
      searchString.length <= 0
    ) {
      tempArr = pokemon;
    } else {
      for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name.toLowerCase().includes(searchString)) {
          tempArr.add(pokemon[i]);
        }
        if (checkIfType(typeArr, pokemon[i].type)) {
          tempArr.add(pokemon[i]);
        }
        if (checkIfType(weakArr, pokemon[i].weaknesses)) {
          tempArr.add(pokemon[i]);
        }
      }
    }

    tempArr = Array.from(tempArr);

    return (
      <ul>
        {tempArr.map(el => (
          <div key={el.id} className="pokeList">
            <li>
              Name: {el.name}
              <br />
              Pokedex Number: {el.num}
              <br />
              Pokemon Type: {el.type + ""}
              <br />
              Weakness: {el.weaknesses + ""}
              <br />
            </li>
            <img src={el.img} alt="pokeImage" />
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1 className="header">Pokedex</h1>
      <div className="pokeSearchDiv">
        <input
          type="search"
          className="pokeSearch"
          placeholder="pokemon"
          onChange={e => onChange(e)}
        />
      </div>
      <div className="pokeInputs">
        <div className="pokeElement">
          <label>Pokemon Element Type</label>
          <br />
          <div className="pokeCheckbox">
            <input
              type="checkbox"
              id="grass"
              name="grass"
              onClick={e => checkboxTypeClick(e)}
            />
            <label htmlFor="grass">Grass</label>
            <input
              type="checkbox"
              id="poison"
              name="poison"
              onClick={e => checkboxTypeClick(e)}
            />
            <label htmlFor="posion">Poison</label>
            <input
              type="checkbox"
              id="water"
              name="water"
              onClick={e => checkboxTypeClick(e)}
            />
            <label htmlFor="water">Water</label>
            <input
              type="checkbox"
              id="fire"
              name="fire"
              onClick={e => checkboxTypeClick(e)}
            />
            <label htmlFor="fire">Fire</label>
          </div>
        </div>
        <div className="pokeWeakness">
          <label>Pokemon Weakness</label>
          <br />
          <div className="pokeCheckbox">
            <input
              type="checkbox"
              id="weakgrass"
              name="weakgrass"
              onClick={e => checkboxWeaknessClick(e)}
            />
            <label htmlFor="weakgrass">Grass</label>
            <input
              type="checkbox"
              id="weakpoison"
              name="weakpoison"
              onClick={e => checkboxWeaknessClick(e)}
            />
            <label htmlFor="weakposion">Poison</label>
            <input
              type="checkbox"
              id="weakwater"
              name="weakwater"
              onClick={e => checkboxWeaknessClick(e)}
            />
            <label htmlFor="weakwater">Water</label>
            <input
              type="checkbox"
              id="weakfire"
              name="weakfire"
              onClick={e => checkboxWeaknessClick(e)}
            />
            <label htmlFor="weakfire">Fire</label>
          </div>
        </div>
      </div>
      <div className="pokeDexList">{renderPokedex()}</div>
    </div>
  );
};

export default Pokemon;

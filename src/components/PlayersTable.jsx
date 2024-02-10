import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export const PlayersTable = () => {
  const [playersData, setPlayersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [characterSearch, setCharacterSearch] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Establecer inicialmente isMobile

  const itemsPerPage = 10;
  const rankList = ['', 'E', 'D', 'C', 'B', 'A', 'S'];
  const [selectedCharacters, setSelectedCharacters] = useState({});
  let resizeTimer;
  const [countries, setCountries] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getPlayers();




    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }




    // Llamar a handleResize al inicio
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const handleCharacterChange = (event, item, newCharacterValue) => {
    const newSelectedCharacters = { ...selectedCharacters };
    newSelectedCharacters[item.globalRank] = newCharacterValue;
    setSelectedCharacters(newSelectedCharacters);
    updateCharacter(item.username, newCharacterValue)
  };

  const loader = () => {
    const renderRows = () => {
      // Cambia el 10 por el número de veces que quieres repetir el elemento <tr>
      const rows = Array.from({ length: 10 }, (_, index) => (
        <tr className='row-item-desktop' key={index}>
          <td className='rank-td'><Skeleton /></td>
          <th>
            <div className="user-info">
              <div className="character-img">
                <Skeleton
                  circle
                  width={70}
                  height={70}
                  containerClassName="avatar-skeleton"
                />
              </div>
              <div className="rank-icon">
                <Skeleton
                  circle
                  width={30}
                  height={30}
                />
              </div>
              <div className="username">
                <Skeleton
                  width={300}
                  height={20}
                />
              </div>
            </div>
          </th>
          <td>
            <Skeleton
              width={120}
              height={30}
            />
          </td>
          <td>
            <Skeleton
              width={100}
              height={20}
            />
          </td>
        </tr>
      ));

      return rows;
    };

    return (
      <>
        <table>
          <thead>
            <tr>
              <th><Skeleton /></th>
              <th><Skeleton /></th>
              <th><Skeleton /></th>
              <th><Skeleton /></th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      </>
    );
  }


  const renderTable = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredData = playersData.filter((item) => {
      const usernameMatch = item.username.toLowerCase().includes(searchTerm.toLowerCase());
      const countryMatch = item.country.toLowerCase().includes(countrySearch.toLowerCase());
      const characterMatch = item.character.toLowerCase().includes(characterSearch.toLowerCase());

      return usernameMatch && countryMatch && characterMatch;
    });

    const currentData = filteredData.slice(startIndex, endIndex);


    return (
      <div>
        <div className="search-controls">
          <input
            type="text"
            placeholder="Buscar por nombre de usuario"
            value={searchTerm}
            className='input-search-rank'
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

        </div>
        <div className="advanced-search">
          <div className="countrySearch">
            <label htmlFor="country-select">Country:</label>

            <select placeholder='Buscar por país' className='country-select' onChange={(e) => {
              setCountrySearch(e.target.value);
              setCurrentPage(1);
            }} name="country-search" id="country-select">
              <option value="">All</option>
              {countries.sort().map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>

          </div>

          <div className="characterSearch">

            <label htmlFor="country-select">Character:</label>

            <select placeholder='Buscar por personaje' className='character-select' onChange={(e) => {
              setCharacterSearch(e.target.value);
              setCurrentPage(1);
            }} name="character-search" id="country-select">
              <option value="">All</option>
              {characters.sort().map((character, index) => (
                <option key={index} value={character}>
                  {capitalizeFirstLetter(character)}

                </option>
              ))}
            </select>

          </div>
        </div>
        <table>
          {isMobile ? (
            <div></div>
          ) : (
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Character</th>
                <th>Country</th>
              </tr>
            </thead>
          )}

          <tbody>
            {currentData.map((item) => (
              <tr className={`row-item-${isMobile ? 'mobile' : 'desktop'}`} key={item.globalRank}>
                {isMobile ? (<div className='user-card'>
                  <div className='global-rank-mobile'>{item.globalRank}</div>
                  <div className="character-img-mobile">
                    <img src={`/images/${(selectedCharacters[item.globalRank] || item.character || 'unknown')}.png`} alt="" />
                  </div>
                  <div className="user-info-mobile">
                    <div className="rank-username">
                      <div className={`rank-icon rank-icon-${item.rank}`}>{rankList[item.rank]}</div>
                      <div className='username-mobile'>{item.username}</div>

                    </div>
                    <div className='character-mobile'>                  <td>
                      <select className='select-input-char' name="" id="" value={selectedCharacters[item.globalRank] || item.character} onChange={(event) => {
                        const newCharacterValue = event.target.value;
                        handleCharacterChange(event, item, newCharacterValue);
                      }}>
                        <option value="unknown">Unknown</option>

                        <option value="akuma">Akuma</option>
                        <option value="alex">Alex</option>
                        <option value="chun-li">Chun-Li</option>
                        <option value="dudley">Dudley</option>
                        <option value="elena">Elena</option>
                        <option value="hugo">Hugo</option>
                        <option value="ibuki">Ibuki</option>
                        <option value="ken">Ken</option>
                        <option value="makoto">Makoto</option>
                        <option value="necro">Necro</option>
                        <option value="oro">Oro</option>
                        <option value="q">Q</option>
                        <option value="remy">Remy</option>
                        <option value="ryu">Ryu</option>
                        <option value="sean">Sean</option>
                        <option value="twelve">Twelve</option>
                        <option value="urien">Urien</option>
                        <option value="yang">Yang</option>
                        <option value="yun">Yun</option>
                      </select>
                    </td></div>
                    <div className='country-mobile'>
                      <div className="country-flag">
                        <img src={`https://flagsapi.com/${item.countryCode}/flat/64.png`} alt="" /></div>
                      <div className="country-name">
                        {item.country}
                      </div>
                    </div>
                  </div>
                </div>) : (<>
                  <td className='rank-td'>{item.globalRank}</td>
                  <th>
                    <div className='user-info'>
                      <div className="character-img">
                        <img
                          src={`/images/${(selectedCharacters[item.globalRank] || item.character || 'unknown')}.png`}
                          alt=""
                        />
                      </div>
                      <div className={`rank-icon rank-icon-${item.rank}`}>{rankList[item.rank]}</div>
                      <div className="username">

                        <a href="">{item.username}</a>
                      </div>
                    </div>
                  </th>
                  <td>
                    <select className='select-input-char' name="" id="" value={selectedCharacters[item.globalRank] || item.character} onChange={(event) => {
                      const newCharacterValue = event.target.value;
                      handleCharacterChange(event, item, newCharacterValue);
                    }}>
                      <option value="unknown">Unknown</option>

                      <option value="akuma">Akuma</option>
                      <option value="alex">Alex</option>
                      <option value="chun-li">Chun-Li</option>
                      <option value="dudley">Dudley</option>
                      <option value="elena">Elena</option>
                      <option value="hugo">Hugo</option>
                      <option value="ibuki">Ibuki</option>
                      <option value="ken">Ken</option>
                      <option value="makoto">Makoto</option>
                      <option value="necro">Necro</option>
                      <option value="oro">Oro</option>
                      <option value="q">Q</option>
                      <option value="remy">Remy</option>
                      <option value="ryu">Ryu</option>
                      <option value="sean">Sean</option>
                      <option value="twelve">Twelve</option>
                      <option value="urien">Urien</option>
                      <option value="yang">Yang</option>
                      <option value="yun">Yun</option>
                    </select>
                  </td>
                  <td>
                    <div className="country">
                      <div className="country-flag"><img src={`https://flagsapi.com/${item.countryCode}/flat/64.png`} alt="" /></div>
                      <div className="country-name">{item.country}</div>
                    </div>
                  </td>
                </>)
                }

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const addCharacters = (playersData) => {
    try {
      // Verificar que playersData sea un array antes de continuar
      if (!Array.isArray(playersData)) {
        console.error('Los datos de los jugadores no son un array:', playersData);
        return;
      }

      // Crear un Set temporal para garantizar países únicos
      const characterSet = new Set(characters);

      // Iterar sobre los datos de los jugadores y agregar países al Set
      playersData.forEach(player => {
        const character = player.character;
        characterSet.add(character);
      });

      // Convertir el Set de países de nuevo a un array y establecer el estado
      setCharacters(Array.from(characterSet));

      console.log(characters);
    } catch (error) {
      console.error('Error al agregar países:', error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const addCountries = (playersData) => {
    try {
      // Verificar que playersData sea un array antes de continuar
      if (!Array.isArray(playersData)) {
        console.error('Los datos de los jugadores no son un array:', playersData);
        return;
      }

      // Crear un Set temporal para garantizar países únicos
      const countrySet = new Set(countries);

      // Iterar sobre los datos de los jugadores y agregar países al Set
      playersData.forEach(player => {
        const country = player.country;
        countrySet.add(country);
      });

      // Convertir el Set de países de nuevo a un array y establecer el estado
      setCountries(Array.from(countrySet));

      console.log(countries);
    } catch (error) {
      console.error('Error al agregar países:', error);
    }
  };


  const getPlayers = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Error al obtener datos');
      }

      const result = await response.json();

      // Llamada a la función que agrega países
      addCountries(result);
      addCharacters(result);

      // Establecer el estado de playersData
      setPlayersData(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // const getPlayers = async () => {
  //   try {
  //     const response = await fetch("https://us-central1-fightcade-rank.cloudfunctions.net/app", {
  //       method: 'GET'
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error al obtener datos');
  //     }

  //     const result = await response.json();

  //     // Llamada a la función que agrega países
  //     addCountries(result);
  //     addCharacters(result);

  //     // Establecer el estado de playersData
  //     setPlayersData(result);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const updateCharacter = (username, newCharacter) => {

    var raw = "";

    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };
    fetch(`http://localhost:3000/updateCharacter?username=${username}&character=${newCharacter}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <>

      {playersData.length > 0 ? renderTable() : loader()}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className='previous-page-btn'
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {currentPage}
        <button
          className='next-page-btn'
          disabled={currentPage * itemsPerPage >= playersData.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </>
  );
};

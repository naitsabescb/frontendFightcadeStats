import React, { useState, useEffect } from 'react';

export const PlayersTable = () => {
  const [playersData, setPlayersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 10;
  const rankList = ['', 'E', 'D', 'C', 'B', 'A', 'S'];
  const [selectedCharacters, setSelectedCharacters] = useState({});


  useEffect(() => {
    // Realiza una llamada a la API cuando el componente se monta
    getPlayers();

    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

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

  const renderTable = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = playersData
      .filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(startIndex, endIndex);

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
                    <img src={`/public/images/${selectedCharacters[item.globalRank] || item.character}.png`} alt="" />
                  </div>
                  <div className="user-info-mobile">
                    <div className="rank-username">
                      <div className={`rank-icon rank-icon-${item.rank}`}>{rankList[item.rank]}</div>
                      <div className='username-mobile'>{item.username}</div>

                    </div>
                    <div className='character-mobile'>                  <td>
                    <select name="" id="" value={selectedCharacters[item.globalRank] || item.character} onChange={(event) => {
                      const newCharacterValue = event.target.value;
                      handleCharacterChange(event, item, newCharacterValue);
                    }}>
                      <option value="">Unknown</option>

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
                    <div className='country-mobile'>{item.country}</div>
                  </div>
                </div>) : (<>
                  <td className='rank-td'>{item.globalRank}</td>
                  <th>
                    <div className='user-info'>
                      <div className="character-img"></div>
                      <div className={`rank-icon rank-icon-${item.rank}`}>{rankList[item.rank]}</div>
                      <div className="username">

                        <a href="">{item.username}</a>
                      </div>
                    </div>
                  </th>
                  <td>
                    <select name="" id="" value={selectedCharacters[item.globalRank] || item.character} onChange={(event) => {
                      const newCharacterValue = event.target.value;
                      handleCharacterChange(event, item, newCharacterValue);
                    }}>
                      <option value="">Unknown</option>

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
                  <td>{item.country}</td>
                </>)
                }

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getPlayers = () => {
    fetch("https://us-central1-fightcade-rank.cloudfunctions.net/app", {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => setPlayersData(result))
      .catch(error => console.error('error', error));
  };

  const updateCharacter = (username, newCharacter) => {

    var raw = "";

    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };
    fetch(`https://us-central1-fightcade-rank.cloudfunctions.net/app/updateCharacter?username=${username}&character=${newCharacter}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <>

      {playersData.length > 0 ? renderTable() : 'Loading data...'}
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

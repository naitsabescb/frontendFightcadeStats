import React, { useState, useEffect } from 'react';

export const PlayersTable = () => {
  const [playersData, setPlayersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 10;
  const rankList = ['', 'E', 'D', 'C', 'B', 'A', 'S'];

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
                  <div className="character-img-mobile"></div>
                  <div className="user-info-mobile">
                    <div className="rank-username">
                      <div className={`rank-icon rank-icon-${item.rank}`}>{rankList[item.rank]}</div>
                      <div className='username-mobile'>{item.username}</div>

                    </div>
                    <div className='character-mobile'>{item.character}</div>
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
                  <td>{item.character}</td>
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

  return (
    <>

      {playersData.length > 0 ? renderTable() : 'Loading data...'}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className='previous-page-btn'
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>
        {currentPage}
        <button
          className='next-page-btn'
          disabled={currentPage * itemsPerPage >= playersData.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';

export const PlayersTable = () => {
  const [playersData, setPlayersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    // Realiza una llamada a la API cuando el componente se monta
    getPlayers();
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
        <input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Character</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.globalRank}>
                <td>{item.globalRank}</td>
                <td>{item.username}</td>
                <td>{item.character}</td>
                <td>{item.country}</td>
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
      <div>PlayersTable</div>
      {playersData.length > 0 ? renderTable() : 'Loading data...'}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage * itemsPerPage >= playersData.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

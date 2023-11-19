import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export const PlayersTable = () => {
  const [playersData, setPlayersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Establecer inicialmente isMobile
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const rankList = ['', 'E', 'D', 'C', 'B', 'A', 'S'];
  const [selectedCharacters, setSelectedCharacters] = useState({});
  let resizeTimer;

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

      return usernameMatch && countryMatch;
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
          <select placeholder='Buscar por país' className='country-select' onChange={(e) => {
            setCountrySearch(e.target.value);
            setCurrentPage(1);
          }} name="country-search" id="">
            <option value="" >All</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antartica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Islands">Cocos (Keeling) Islands</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo">Congo, the Democratic Republic of the</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cota D'Ivoire">Cote d'Ivoire</option>
            <option value="Croatia">Croatia (Hrvatska)</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="France Metropolitan">France, Metropolitan</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">French Southern Territories</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
            <option value="Holy See">Holy See (Vatican City State)</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran (Islamic Republic of)</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
            <option value="Korea">Korea, Republic of</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao">Lao People's Democratic Republic</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia">Micronesia, Federated States of</option>
            <option value="Moldova">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint LUCIA">Saint LUCIA</option>
            <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia (Slovak Republic)</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
            <option value="Span">Spain</option>
            <option value="SriLanka">Sri Lanka</option>
            <option value="St. Helena">St. Helena</option>
            <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syrian Arab Republic</option>
            <option value="Taiwan">Taiwan, Province of China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania, United Republic of</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos">Turks and Caicos Islands</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Viet Nam</option>
            <option value="Virgin Islands (British)">Virgin Islands (British)</option>
            <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
            <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Serbia">Serbia</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
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
                    <img src={`/images/${selectedCharacters[item.globalRank] || item.character}.png`} alt="" />
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
                    <div className='country-mobile'>{item.country}</div>
                  </div>
                </div>) : (<>
                  <td className='rank-td'>{item.globalRank}</td>
                  <th>
                    <div className='user-info'>
                      <div className="character-img">
                        <img src={`/images/${selectedCharacters[item.globalRank] || item.character}.png`} alt="" />
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

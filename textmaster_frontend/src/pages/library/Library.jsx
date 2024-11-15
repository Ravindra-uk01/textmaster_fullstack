import { RiStackLine } from 'react-icons/ri';
import Base from '../Base/Base.jsx';
import { useState } from 'react';
import "./library.css";
import { IoSearch } from 'react-icons/io5';
import ThreadLibraryComp from '../../components/ThreadLibraryComp.jsx';

const Library = () => {

    const [searchValue, setSearchValue] = useState("");

  return (
    <Base> 
      <div className="library_navbar">
            <div className="library_navbar-heading" >
                <RiStackLine size={25} />
                <h2>Library</h2>
            </div>
            <div className="library_navbar-search" >
                <IoSearch size={20} color="grey" />
                <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}  />
                <label>Search your threads...</label>
            </div>
      </div>

      
      <div className="px-2">
        <ThreadLibraryComp/>
      </div>
    </Base>
  )
}

export default Library;
import { RiStackLine } from 'react-icons/ri';
import Base from '../Base/Base.jsx';
import { useEffect, useState } from 'react';
import "./library.css";
import { IoSearch } from 'react-icons/io5';
import ThreadLibraryComp from '../../components/ThreadLibraryComp.jsx';
import { setFilters } from '../../reducers/threadReducer.js';
import { useDispatch } from 'react-redux';

const Library = () => {

    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();

    useEffect(()=> {
      dispatch(setFilters({entity: "myThreads", value: searchValue }));
    },[dispatch, searchValue])

  return (
    <Base> 
      <div className="library_navbar">
            <div className="library_navbar-heading" >
                <RiStackLine size={25} />
                <h3>Library</h3>
            </div>
            <div className="library_navbar-search" >
                <IoSearch size={20} color="grey" />
                <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search your threads...'  />
                {/* <label>Search your threads...</label> */}
            </div>
      </div>

      
      <div className="px-2">
        <ThreadLibraryComp/>
      </div>
    </Base>
  )
}

export default Library;
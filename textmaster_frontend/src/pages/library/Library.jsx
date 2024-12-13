import { RiStackLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import "./library.css";
import { IoSearch } from 'react-icons/io5';
import ThreadLibraryComp from '../../components/ThreadLibraryComp.jsx';
import { setFilters } from '../../reducers/threadReducer.js';
import { useDispatch } from 'react-redux';
import useDebounce from '../../hooks/UseDebounce.jsx';
import Base from '../base/Base.jsx';

const Library = () => {

    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const debouncedValue = useDebounce(searchValue, 300);

    useEffect(()=> {
      dispatch(setFilters({entity: "myThreads", search: debouncedValue }));
    },[dispatch, debouncedValue])

  return (
    <Base> 
      <div className="library_navbar">
            <div className="library_navbar-heading" >
                <RiStackLine size={25} />
                <h2>Library</h2>
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
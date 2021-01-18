import Dropdown from 'react-dropdown';

import { SearchWrapper } from './SearchBarStyles';
import { MagnifyingGlass } from '@styled-icons/foundation/MagnifyingGlass';
import { useState, useMemo, useRef, useEffect } from 'react';

import 'react-dropdown/style.css';

function generateYears() {
  const years = [{ value: 'Year', label: 'Year' }];

  for (let year = new Date().getFullYear() - 1; year >= 1981; year--) {
    years.push({ value: year, label: year });
  }

  return years;
}

function dropdownClassNames() {
  const classNamePrefixArray = ['control', 'placeholder', 'menu'];

  return classNamePrefixArray.reduce((classNamesObj, prefix) => {
    classNamesObj[`${prefix}ClassName`] = `dropdown-${prefix}`;
    return classNamesObj;
  }, {});
}

export default function MovieSearchBar({ setSearchQuery, variants }) {
  const [searchParam, setSearchParam] = useState('');
  const [yearOfRelease, setYearOfRelease] = useState('');

  const inputRef = useRef();
  const yearOptions = useMemo(generateYears, []);

  const handleSubmit = e => {
    if (e) e.preventDefault();
    setSearchQuery([
      ['s', searchParam],
      ['y', yearOfRelease],
    ]);
  };

  const setYear = e => {
    setYearOfRelease(e.value);
    if (!searchParam) return;

    setSearchQuery([
      ['s', searchParam],
      ['y', e.value],
    ]);
  };

  useEffect(() => {
    if (searchParam) return;
    inputRef.current.focus();
  }, [yearOfRelease]);

  return (
    <SearchWrapper variants={variants} className="movie-search-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="text-input-wrapper">
          <input
            ref={inputRef}
            required
            autoFocus
            autoComplete="off"
            value={searchParam}
            onChange={e => setSearchParam(e.target.value)}
            placeholder="Search movie nominations by title"
            name="movie-search-bar"
          />

          <button type="submit">
            <MagnifyingGlass />
          </button>
        </div>

        <Dropdown
          {...dropdownClassNames()}
          className="year-dropdown"
          options={yearOptions}
          placeholder="Year"
          onChange={setYear}
        />
      </form>
    </SearchWrapper>
  );
}

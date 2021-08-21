/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { GlobalContext } from '../../../context/globalProvider';

function NoteFilter({ setFilter }) {
  const { tagsCount, notes } = useContext(GlobalContext);

  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('all');
  const [count, setCount] = useState({});
  useEffect(() => {
    setCount(tagsCount);
  }, [tagsCount]);

  return (
    <>
      <Button
        size="small"
        className={
          search === 'all'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => {
          setSearch('all');
          setFilter('all');
        }}
      >
        {'All'}
        {' '}
        {`(${notes && notes.length})`}
      </Button>
      {count && count !== {}
        ? Object.entries(count).map(([key, value]) => (
          <Button
            size="small"
            className={
                search === key
                  ? 'multi__search__button active'
                  : 'multi__search__button'
              }
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSearch(key);
              setFilter(key);
            }}
          >
            {key}
            {' '}
            {`(${value})`}
          </Button>
        ))
        : null}
    </>
  );
}

export default NoteFilter;

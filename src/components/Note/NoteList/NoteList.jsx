/* eslint-disable no-nested-ternary */

import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../../context/globalProvider';
import Note from '../Note';
import './NoteList.css';
import { getAllNotes } from '../../../API/NoteApi';
import NoteFilter from '../NoteFilter/NoteFilter';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
}));

function NoteList() {
  const {
    token, notes, getNotes, filteredNotes, setTagsCount, setFilteredNotes,
  } = useContext(GlobalContext);

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);

  const setFilterSearch = (keyword) => {
    if (keyword === 'all') {
      setFilteredNotes([]);
      return;
    }
    const filteredData = notes.filter((item) => item.blog_tags.includes(keyword));
    setFilteredNotes(filteredData);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const res = await getAllNotes(token);
    return res;
  };

  useEffect(() => {
    if (token) {
      getData()
        .then((res) => {
          getNotes(res.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [token]);

  useEffect(() => {
    const localtagscount = {};
    // console.log(note);
    setNote(notes);
    if (notes && notes.length !== 0) {
      notes.forEach((item) => {
        item.blog_tags.split(' ').forEach((tag) => {
          if (Object.keys(localtagscount).includes(tag)) {
            localtagscount[tag] += 1;
          } else {
            localtagscount[tag] = 1;
          }
        });
      });
      setTagsCount(localtagscount);
    }
  }, [notes]);

  return (
    <>
      <div className="bloglist__container">
        <div>
          <div>
            {filteredNotes && filteredNotes.length > 0 ? (
              <div className={classes.root}>
                {filteredNotes.map((oneBlog) => (
                  <Note key={oneBlog.id} note={oneBlog} />
                ))}
              </div>
            ) : (
              <div className={classes.root}>
                {loading ? (
                  <>
                    <Note loading="loading" note={null} />
                  </>
                ) : note?.length ? (
                  note?.map((oneNote) => (
                    <Note key={oneNote.id} note={oneNote} />
                  ))
                ) : (
                  <Note note={null} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="multi__serach">
          <NoteFilter setFilter={setFilterSearch} />
        </div>
      </div>
    </>
  );
}

export default NoteList;

import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../context/globalProvider';
import '../AddNote/AddNote.css';
import { getOneNoteById, updateNote } from '../../API/NoteApi';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '60%',
    minWidth: '200px',
    marginTop: theme.spacing(3),
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2e5c4d',
    color: 'white',
  },
  color: {
    color: '#85a399',
    borderColor: '#85a399',
  },
}));

function EditNote({ match }) {
  const { id } = match.params;
  const [loading, setLoading] = useState(true);
  const { note, getNoteById, token } = useContext(GlobalContext);

  const history = useHistory();

  const classes = useStyles();

  const [noteTitle, setNoteTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const getData = async () => {
    const res = await getOneNoteById(id, token);
    return res;
  };

  useEffect(() => {
    if (token) {
      getData()
        .then((res) => {
          getNoteById(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [token]);

  useEffect(() => {
    setNoteTitle(note?.blog_title);
    setDescription(note?.blog_description);
    setTags(note?.blog_tags);
  }, [note]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (!noteTitle || !description || !tags) {
      toast.error('All the fields are required!');
      return;
    }
    const data = {
      noteTitle,
      description,
      tags,
    };

    const res = await updateNote(id, data, token);

    if (res.status === 204) {
      toast.success('Note updated successfully.');
      history.replace('/notes');
    }
    if (res.status === 200) {
      toast.error(res.data.error);
    }
  };

  if (loading === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="new-note-container">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={submitForm}>
            <Typography component="h1" variant="h5">
              Update Your Note
            </Typography>
            <TextField
              className={classes.color}
              margin="normal"
              required
              fullWidth
              label="Title"
              name="noteTitle"
              autoFocus
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />

            <TextField
              id="outlined-description-static"
              label="Description"
              multiline
              fullWidth
              autoFocus
              margin="normal"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="outlined-tags-static"
              label="Tags"
              multiline
              fullWidth
              autoFocus
              margin="normal"
              rows={2}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Post
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

EditNote.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditNote;

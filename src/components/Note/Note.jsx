/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';
import './Note.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px',
  },
  clarify: {
    height: 0,
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  blogTitle: {
    margin: '0px',
  },
  avatar: {
    backgroundColor: '#85a399',
  },
  iconColor: {
    color: 'red',
  },
  media: {
    height: '200px',
    width: '200px',
    borderRadius: '10px',
    objectFit: 'contain',
    paddingTop: '56.25%',
  },
  deleteIcon: {
    color: '#2e5c4d',
  },
}));

function Note({ note, loading }) {
  const { userId } = useContext(GlobalContext);

  const classes = useStyles();
  if (loading) {
    return (
      <div className="blog__card_root_container no__blogs">Loading...</div>
    );
  }
  return (
    <>
      {note ? (
        <Card className="blog__card_root_container">
          <CardHeader
            avatar={(
              <Avatar aria-label="recipe" className={classes.avatar}>
                {note.blog_title[0].toUpperCase()}
              </Avatar>
            )}
          />

          <div className="blog__body">
            <div className="blog__body_content">
              <CardContent>
                <Typography
                  variant="h5"
                  className={classes.blogTitle}
                  component="h2"
                >
                  {note.blog_title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {note.blog_tags.split(' ').map((tag) => `#${tag} `)}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  {note.blog_description}
                </Typography>
              </CardContent>
            </div>
          </div>
          {note.blog_author === userId ? (
            <CardActions>
              <>
                <IconButton>
                  <NavLink to={`/note/${note.id}/edit`} exact>
                    <EditIcon className={classes.deleteIcon} />
                  </NavLink>
                </IconButton>
              </>
            </CardActions>
          ) : null}
        </Card>
      ) : (
        <div className="blog__card_root_container no__blogs">no Notes</div>
      )}
    </>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    blog_title: PropTypes.string.isRequired,
    authorname: PropTypes.string.isRequired,
    blog_description: PropTypes.string.isRequired,
    blog_tags: PropTypes.string.isRequired,
    created_date: PropTypes.string.isRequired,
    updated_date: PropTypes.string,
    blog_author: PropTypes.string.isRequired,
  }),
  loading: PropTypes.string,
};

export default Note;

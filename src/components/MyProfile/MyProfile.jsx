import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { GlobalContext } from '../../context/globalProvider';
import './MyProfile.css';
import { getUserById } from '../../API/UserApi';

function MyProfile({ match }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const { userData, userDetails, token } = useContext(GlobalContext);

  const { id } = match.params;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const res = await getUserById(id, token);
    return res;
  };

  useEffect(() => {
    if (token) {
      getData()
        .then((res) => {
          userDetails(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [getData, token, userDetails]);

  useEffect(() => {
    setData(userData);
  }, [userData, data]);

  return (
    <>
      {!loading ? (
        <div className="blog-details-container">
          <h1>My Profile </h1>
          <hr />
          <div className="blog-details-title">
            <h3>{data && `${data.firstname} ${data.lastname}`}</h3>
            <h3>{data && `${data.email}`}</h3>
          </div>
          <hr />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

MyProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MyProfile;

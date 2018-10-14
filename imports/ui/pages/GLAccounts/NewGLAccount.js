import React from 'react';
import PropTypes from 'prop-types';
import AccountForm from '../../components/GLAccounts/AccountForm';

const NewGLAccount = ({ history }) => (
  <div className="NewGLAccount">
    <h4 className="page-header">New Account</h4>
    <AccountForm history={history} />
  </div>
);

NewGLAccount.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewGLAccount;

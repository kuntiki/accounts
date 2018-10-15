import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import GLAccounts from '../../../api/GLAccounts/GLAccounts';
import AccountForm from '../../components/GLAccounts/AccountForm';
import NotFound from '../NotFound/NotFound';

const EditGLAccount = ({ account, history }) => (account ? (
  <div className="EditDocument">
    <h4 className="page-header">{`Editing "${account.name}"`}</h4>
    <AccountForm account={account} history={history} />
  </div>
) : <NotFound />);

EditGLAccount.defaultProps = {
  account: null,
};

EditGLAccount.propTypes = {
  account: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const accountId = match.params._id;
  const subscription = Meteor.subscribe('accounts.edit', accountId);

  return {
    loading: !subscription.ready(),
    account: GLAccounts.findOne(accountId),
  };
})(EditGLAccount);

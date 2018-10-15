import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import GLAccounts from '../../../api/GLAccounts/GLAccounts';
import NotFound from '../NotFound/NotFound';

const handleRemove = (accountId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('accounts.remove', accountId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Account deleted!', 'success');
        history.push('/glaccounts');
      }
    });
  }
};

const renderDocument = (account, match, history) => (account ? (
  <div className="ViewGLAccount">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ account && account.code }</h4>
      {Meteor.isClient && Meteor.userId() ? (
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(account._id, history)} className="text-danger">
              Delete
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      ) : ''}
    </div>
    { account && account.name }
  </div>
) : <NotFound />);

const ViewGLAccount = ({ account, match, history }) => (renderDocument(account, match, history));

ViewGLAccount.defaultProps = {
  account: null,
};

ViewGLAccount.propTypes = {
  account: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({ ...state })),
  withTracker(({ match }) => {
    const accountId = match.params._id;
    if (Meteor.isClient) Meteor.subscribe('accounts.view', accountId);

    return {
      account: GLAccounts.findOne(accountId),
    };
  }),
)(ViewGLAccount);

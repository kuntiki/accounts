import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import GLAccountsCollection from '../../../api/GLAccounts/GLAccounts';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';

const StyledGLAccounts = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const handleRemove = (accountId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('accounts.remove', accountId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Account deleted!', 'success');
      }
    });
  }
};

const GLAccounts = ({
  loading, accounts, match, history,
}) => (!loading ? (
  <StyledGLAccounts>
    <div className="page-header clearfix">
      <h4 className="pull-left">GL Accounts</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add GL Account</Link>
    </div>
    {accounts.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th>Currency</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {accounts.map(({
            _id, code, name, type, currency,
          }) => (
            <tr key={_id}>
              <td>{code}</td>
              <td>{name}</td>
              <td>{type}</td>
              <td>{currency}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="No accounts created yet"
        subtitle="Add your first account by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Account',
        }}
      />}
  </StyledGLAccounts>
) : <Loading />);

GLAccounts.propTypes = {
  loading: PropTypes.bool.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('accounts');
  return {
    loading: !subscription.ready(),
    accounts: GLAccountsCollection.find().fetch(),
  };
})(GLAccounts);

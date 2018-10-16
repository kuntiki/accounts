import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import TransactionsCollection from '../../../api/Transactions/Transactions';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';

const StyledTransactions = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const Transactions = ({
  loading, transactions, match, history,
}) => (!loading ? (
  <StyledTransactions>
    <div className="page-header clearfix">
      <h4 className="pull-left">Transactions</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Post New Transaction</Link>
    </div>
    {transactions.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Number</th>
            <th>Pos</th>
            <th>Account</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({
            _id, number, lines,
          }) => (
            <tr key={_id}>
              <td>{number}</td>
              <td>{lines}</td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="No transactions created yet"
        subtitle="Add your first transaction by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Transaction',
        }}
      />}
  </StyledTransactions>
) : <Loading />);

Transactions.propTypes = {
  loading: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('transactions');
  return {
    loading: !subscription.ready(),
    transactions: TransactionsCollection.find().fetch(),
  };
})(Transactions);


// Transactions.schema = new SimpleSchema({
//   number: {
//     type: SimpleSchema.Integer,
//     label: 'The transaction number/identifier.',
//   },
//   lines: {
//     type: Array,
//     label: 'Posting lines.',
//     mincount: 2,
//   },
//   'lines.$': Object,
//   'lines.$.pos': SimpleSchema.Integer,
//   'lines.$.account': String,
//   'lines.$.dctype': String,
//   'lines.$.amount': Number,
// });

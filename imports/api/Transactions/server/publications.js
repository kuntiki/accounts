import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Transactions from '../Transactions';

Meteor.publish('transactions', () => Transactions.find());

Meteor.publish('transactions.view', (transactionId) => {
  check(transactionId, String);
  return Transactions.find({ _id: transactionId });
});

Meteor.publish('transactions.edit', (transactionId) => {
  check(transactionId, String);
  return Transactions.find({ _id: transactionId });
});

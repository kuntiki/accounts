/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Transactions from './Transactions';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'transactions.findOne': function transactionsFindOne(transactionId) {
    check(transactionId, Match.OneOf(String, undefined));

    try {
      return Transactions.findOne(transactionId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'transactions.insert': function transactionsInsert(transaction) {
    check(transaction, {
      number: Number,
      lines: Array,
    });

    try {
      return Transactions.insert(transaction);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'transactions.update': function transactionsUpdate(transaction) {
    check(transaction, {
      _id: String,
      number: String,
      lines: Array,
    });

    try {
      const transactionId = transaction._id;
      Transactions.update(transactionId, { $set: transaction });
      return transactionId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'transactions.remove': function transactionsRemove(transactionId) {
    check(transactionId, String);

    try {
      return Transactions.remove(transactionId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'transactions.insert',
    'transactions.update',
    'transactions.remove',
  ],
  limit: 5,
  timeRange: 1000,
});

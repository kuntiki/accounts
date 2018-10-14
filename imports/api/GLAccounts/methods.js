/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import GLAccounts from './GLAccounts';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'accounts.findOne': function accountsFindOne(accountId) {
    check(accountId, Match.OneOf(String, undefined));

    try {
      return GLAccounts.findOne(accountId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'accounts.insert': function accountsInsert(account) {
    check(account, {
      code: String,
      name: String,
      type: String,
      currency: String,
    });

    try {
      return GLAccounts.insert(account);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'accounts.update': function accountsUpdate(account) {
    check(account, {
      _id: String,
      code: String,
      name: String,
      type: String,
      currency: String,
    });

    try {
      const accountId = account._id;
      GLAccounts.update(accountId, { $set: account });
      return accountId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'accounts.remove': function accountsRemove(accountId) {
    check(accountId, String);

    try {
      return GLAccounts.remove(accountId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'accounts.insert',
    'accounts.update',
    'accounts.remove',
  ],
  limit: 5,
  timeRange: 1000,
});

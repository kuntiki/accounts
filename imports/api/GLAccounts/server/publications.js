import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import GLAccounts from '../GLAccounts';

Meteor.publish('accounts', () => GLAccounts.find());

Meteor.publish('accounts.view', (accountId) => {
  check(accountId, String);
  return GLAccounts.find({ _id: accountId });
});

Meteor.publish('accounts.edit', (accountId) => {
  check(accountId, String);
  return GLAccounts.find({ _id: accountId });
});

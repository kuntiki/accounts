import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const GLAccounts = new Mongo.Collection('GLAccounts');

GLAccounts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

GLAccounts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

GLAccounts.schema = new SimpleSchema({
  code: {
    type: String,
    max: 10,
    label: 'The code/number of the account.',
  },
  name: {
    type: String,
    label: 'The name of the account.',
  },
  type: {
    type: String,
    label: 'The type of the account.',
    allowedValues: ['Asset', 'Liability', 'Equity', 'Income', 'Expense'],
  },
  currency: {
    type: String,
    label: 'The currency of the account',
  },
});

GLAccounts.attachSchema(GLAccounts.schema);

export default GLAccounts;

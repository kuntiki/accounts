import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Transactions = new Mongo.Collection('Transactions');

Transactions.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Transactions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Transactions.schema = new SimpleSchema({
  number: {
    type: SimpleSchema.Integer,
    label: 'The transaction number/identifier.',
  },
  lines: {
    type: Array,
    label: 'Posting lines.',
    minCount: 2,
  },
  'lines.$': Object,
  'lines.$.pos': SimpleSchema.Integer,
  'lines.$.account': String,
  'lines.$.dctype': String,
  'lines.$.amount': Number,
});

Transactions.attachSchema(Transactions.schema);

export default Transactions;

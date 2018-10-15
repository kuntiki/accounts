/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class AccountForm extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        code: {
          required: true,
        },
        name: {
          required: true,
        },
      },
      messages: {
        code: {
          required: 'Account code is required.',
        },
        name: {
          required: 'Account name is required.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const existingAccount = this.props.account && this.props.account._id;
    const methodToCall = existingAccount ? 'accounts.update' : 'accounts.insert';
    console.log(form.type);
    console.log(form.code.value);
    const account = {
      code: form.code.value.trim(),
      name: form.name.value.trim(),
      type: form.type.value.trim(),
      currency: form.currency.value.trim(),
    };

    if (existingAccount) account._id = existingAccount;

    Meteor.call(methodToCall, account, (error, accountId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingAccount ? 'Account updated!' : 'Account added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/glaccounts/${accountId}`);
      }
    });
  }

  render() {
    const { account } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Code</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="code"
            defaultValue={account && account.code}
            placeholder="Account code"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="name"
            defaultValue={account && account.name}
            placeholder="Account name"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Type</ControlLabel>
          <FormControl componentClass="select" placeholder="Expense" name="type" defaultValue={account.type || 'Expense'}>
            <option value="Asset">Asset</option>
            <option value="Liability">Liability</option>
            <option value="Equity">Equity</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Currency</ControlLabel>
          <FormControl componentClass="select" placeholder="USD" name="currency" defaultValue={account.currency || 'USD'}>
            <option value="ARS">Argentine Peso</option>
            <option value="COP">Colombian Peso</option>
            <option value="EUR">Euro</option>
            <option value="USD">US Dollar</option>
          </FormControl>
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {account && account._id ? 'Save Changes' : 'Add Account'}
        </Button>
      </form>
    );
  }
}

AccountForm.defaultProps = {
  account: {
    code: '',
    name: '',
    type: 'Expense',
    currency: 'USD',
  },
};

AccountForm.propTypes = {
  account: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default AccountForm;

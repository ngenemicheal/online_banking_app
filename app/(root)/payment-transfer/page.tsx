import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import React from 'react'
import { getAccount, getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Transfer = async() => {

  const authUser = await getLoggedInUser();
  const accounts = await getAccounts({userId: authUser.$id});

  if(!accounts) return;

  const accountData = accounts?.data;

  return (
    <section className='payment-transfer'>
      <HeaderBox 
        title='Payment Transfer'
        subtext='Please provide any specific details or notes related to the payment transfer'
      />
      <section className='size-full pt-5'>
        <PaymentTransferForm accounts={accountData} />
      </section>
    </section>
  )
}

export default Transfer

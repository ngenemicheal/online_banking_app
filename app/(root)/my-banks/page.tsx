import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import BankCard from '@/components/BankCard';

const MyBanks = async() => {
  const authUser = await getLoggedInUser();
  const accounts = await getAccounts({userId: authUser.$id});

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox 
          title='My Bank Accounts'
          subtext='Effortlessly manage your banking activities'
        />
        <div className="space-y-4">
          <h2 className="header-2">Your Cards</h2>
          <div className="flex flex-wrap gap-6">
            { accounts && accounts.data.map((a: Account) => (
              <BankCard 
                key={accounts.id}
                account={a}
                userName={authUser?.firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks

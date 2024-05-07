import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

export default function Home() {

  const authUser = {firstName: 'Michael', lastName: 'Techie', email: 'techie@gmail.com'};

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type='greeting'
            title='Welcome'
            user={authUser?.firstName || 'Guest'}
            subtext='Access and Manage your account and transactions efficiently.'
          />
          <TotalBalanceBox 
            accounts = {[]}
            totalBanks= {1}
            totalCurrentBalance = {1350.50}
          />
        </header>
      </div> 
      <RightSidebar
        user={authUser} 
        transactions={[]}
        banks={[{currentBalance: 372.28}, {currentBalance: 9382.29}]}
      />
    </section> 
  )
}

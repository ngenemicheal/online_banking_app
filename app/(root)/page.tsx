import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async () => {

  const authUser = await getLoggedInUser();
  // const authUser = {name: 'test'}
  // console.log(authUser);


  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type='greeting'
            title='Welcome'
            user={authUser?.name || 'Guest'}
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
        banks={[{currentBalance: 372.28}, {currentBalance: 932.29}]}
      />
    </section> 
  )
}

export default Home

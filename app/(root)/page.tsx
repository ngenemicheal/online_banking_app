import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async ({searchParams: {id, page}}: SearchParamProps) => {

  const currentPage = Number(page as string) || 1;

  const authUser = await getLoggedInUser();
  const accounts = await getAccounts({userId: authUser.$id});

  if(!accounts) return;

  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId});

  const accountData = accounts?.data;

  // console.log({
  //   accountData,
  //   account
  // })

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
            accounts = {accounts?.data}
            totalBanks= {accounts?.totalBanks}
            totalCurrentBalance = {accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions 
          accounts={accounts?.data}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div> 
      <RightSidebar
        user={authUser} 
        transactions={account?.transactions}
        banks={accounts?.data.slice(0,2)}
      />
    </section> 
  )
}

export default Home

import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { getAccount, getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import TransactionsTable from '@/components/TransactionsTable';
import { Pagination } from '@/components/Pagination';

const TransactionHistory = async ({ searchParams: { id, page }}: SearchParamProps ) => {

  const currentPage = Number(page as string) || 1;

  const authUser = await getLoggedInUser();
  const accounts = await getAccounts({userId: authUser.$id});

  if(!accounts) return;

  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId});

  const rowsPerPage = 10;

  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;

  const indexOfFirstTransactions = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
      indexOfFirstTransactions, indexOfLastTransaction
  );

  return (
    <div className="transactions">
      <div className="transaction-header">
        <HeaderBox
          title='Transaction History'
          subtext='See your bank details and transactions'
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className='text-18 font-bold text-white'>{account?.data.name}</h2>
            <p className='text-14 text-blue-25' >{account?.data.officialName}</p>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>
        <section className='flex flex-col w-full gap-6'>
          <TransactionsTable 
            transactions={account?.transactions}
          />
                <TransactionsTable transactions={currentTransactions} />
                { totalPages > 1 && 
                    <div className='my-4 w-full'>
                        <Pagination totalPages={totalPages} page={currentPage} />
                    </div>
                }
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory

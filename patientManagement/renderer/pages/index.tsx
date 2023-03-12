import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Nextron ⚡</span>
      </div>
      
      
    </React.Fragment>
  );
}

export default Home;

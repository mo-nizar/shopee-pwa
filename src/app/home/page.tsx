"use client";
import { useEffect, useState } from 'react';
import { Section } from '@radix-ui/themes';
import Navbar from '@/components/Navbar';
import TableList from '@/components/TableList';
import DataTable from '@/components/DataTable';

export default function LoginPage() {
  const [data, setData] = useState({});
  const [selectedRecord, setSelectedRecord] = useState('orders');

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () => {
    try{
      let token = sessionStorage.getItem("auth-token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}?selected=${selectedRecord}`, {
        headers: { 'auth-token': `${token}` },
      });
      
  
      const resData = await response.json();
  
      if(resData.status==200){
        setData(resData?.data);
        setSelectedRecord(resData?.data?.defaultRecord ?? 'orders')
      }else{
        console.error('Something went wrong');
      }
  
        // sessionStorage.removeItem("key");
        // // Remove all saved data from sessionStorage
        // sessionStorage.clear();
    }catch(e){
      console.error(e);
    }
  };

  

  return (
    <div className='w-100 h-screen'>
      <Navbar/>
      <Section size="1" className='flex-1 w-screen h-full	b-8 p-12'>
        <TableList classNames='p-8 mt-8 w-max' list={data?.collections ?? []} selected={selectedRecord} setSelectedTab={setSelectedRecord}/>

        <DataTable data={data.products ?? []} classNames='p-8 mt-8'/>
      </Section>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
};

import React, { useEffect } from 'react'
import { Copy, Pointer } from 'lucide-react'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addToPastes, updatePastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [val, setVal]=useState('');
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId=searchParams.get("pasteId");
  const pastes=useSelector((state)=>state.paste.pastes);

  function addPaste(){
    // first-need to create paste
    const paste={
      title: title,
      content: val,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if(pasteId){
      dispatch(updatePastes(paste));
    }
    else{
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setVal('');
    setSearchParams({});
  }

  useEffect(() => {
    if(pasteId){
      const paste = pastes.find((item)=>item._id==pasteId);
      setTitle(paste.title);
      setVal(paste.content);
    }
  }, [pasteId])
  
  

  return (
    <div>

      {/* Title and button */}
      <div className='mx-auto mt-[2.5rem] flex justify-between w-[60%] '>

        <input type="text"
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='w-[80%] text-black border border-gray-300 rounded-md p-2 focus:outline-none'
        />

        <button onClick={addPaste}
        className='border border-gray-500 p-2 px-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white'>{(pasteId)? 'Update Code':'Add to Shelf'}</button>

      </div>

      {/* 3 Circles and Copy btn */}
      <div className='mt-[1.6rem] mx-auto w-[60%] border border-gray-300 rounded-[3px]'>

        <div className='flex justify-between items-center px-4 py-1'>

          <div className='flex justify-between gap-x-1'>
            <div onClick={()=>setVal('')} className='w-[13px] h-[13px] border rounded-full bg-red-600'></div>
            <div className='w-[13px] h-[13px] border rounded-full bg-yellow-500'></div>
            <div className='w-[13px] h-[13px] border rounded-full bg-green-500'></div>
          </div>

            <button onClick={()=>{
              navigator.clipboard.writeText(val);
              toast.success('Copied to Clipboard',{position: 'top-center'});              
            }}>
              <Copy className='w-[19px] h-[19px] my-[1.5px]'/>
            </button>

        </div>

        {/* TextArea */}
        <div className='border-t border-gray-300 w-[100%]'>
          <textarea 
          value={val}
          onChange={(e)=>setVal(e.target.value)}
          placeholder='Write Your Content Here....' 
          rows={20} 
          className='resize-none w-full outline-none p-3'>
          </textarea>
        </div>

      </div>

    </div>
  )
}

export default Home

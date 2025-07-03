import React from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {

  const {id}=useParams();

  const pastes=useSelector((state)=>state.paste.pastes);
  
  const paste=pastes.filter((item)=>item._id===id)[0];

  return (
    <div>
      
      {/* Title and button */}
      <div className='mx-auto mt-[2.5rem] w-[60%]  '>

        <input type="text"
          placeholder='Title'
          value={paste.title}
          className='w-[100%] text-black border border-gray-300 rounded-md p-2 focus:outline-none'
          disabled
        />

      </div>

      {/* 3 Circles and Copy btn */}
      <div className='mt-[1.6rem] mx-auto w-[60%] border border-gray-300 rounded-[3px]'>

        <div className='flex justify-between items-center px-4 py-1'>

          <div className='flex justify-between gap-x-1'>
            <div className='w-[13px] h-[13px] border rounded-full bg-red-600'></div>
            <div className='w-[13px] h-[13px] border rounded-full bg-yellow-500'></div>
            <div className='w-[13px] h-[13px] border rounded-full bg-green-500'></div>
          </div>

            <button onClick={()=>{
              navigator.clipboard.writeText(paste.content);
              toast.success('Copied to Clipboard',{position: 'top-right'});              
            }}>
              <Copy className='w-[19px] h-[19px] my-[1.5px]'/>
            </button>

        </div>

        {/* TextArea */}
        <div className='border-t border-gray-300 w-[100%]'>
          <textarea 
          value={paste.content}
          disabled
          placeholder='Write Your Content Here....' 
          rows={20} 
          className='resize-none w-full outline-none p-3'>       
          </textarea>
        </div>

      </div>


    </div>
  )
}

export default ViewPaste
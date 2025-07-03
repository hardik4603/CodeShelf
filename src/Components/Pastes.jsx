import React, {useState} from 'react'
import { Calendar, Copy, Eye, PencilLine, Share, Trash2 } from "lucide-react";
import { useSelector } from 'react-redux';
import { FormatDate } from '../utils/formatDate';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';
import { useNavigate } from 'react-router-dom';

const Pastes = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [search, setSearch] = useState('');
  const filtered=pastes.filter((paste)=>paste.title.toLowerCase().includes(search));

  function viewPaste(_id){
    navigate(`/pastes/${_id}`);
  }

  function handleShare(paste){
    navigator.clipboard.writeText(`${window.location.origin}/pastes/${paste._id}`);
    alert("This Snippet won't be visible on any other Browser or Device");
    toast.success('Link Copied to Clipboard');
  }

  return (
    <div className='w-[70%] mx-auto '>
      <div className='mt-[4rem] flex flex-col gap-y-3 justify-between '>

        <input type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder='Search your code here...'
          className='w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none'
        />

        <div className='border border-gray-300'>
          <div>
            <h1 className="p-4 text-4xl font-bold border-b border-gray-300">All Codes</h1>
          </div>
          <div className='p-4 flex flex-col justify-between gap-y-4'>
            {
              // rendering every Paste
              (filtered.length==0)? <div className='text-2xl text-red-400'>No Paste Found</div> :
              filtered.map((paste, idx) => (

                <div key={idx} className='border flex justify-between border-gray-300 p-4 w-full'>

                  <div className="w-[50%] flex flex-col space-y-3 w-[50%]">
                    <p className="text-3xl font-semibold ">{paste.title}</p>
                    <p className="text-sm font-normal line-clamp-2 max-w-[80%] text-[#707070]">
                      {paste.content}
                    </p>
                  </div>

                  <div className=' w-[21%] flex flex-col justify-between'>

                    <div className='flex justify-between w-[100%]'>
                      <button className='border border-gray-300 p-1 rounded-[0.2rem]'>
                        <a href={`/?pasteId=${paste?._id}`}><PencilLine className='w-[22px] h-[22px]' /></a>
                      </button>
                      <button onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success('Copied to Clipboard', { position: 'top-right' });

                      }} className='border border-gray-300 p-1 rounded-[0.2rem]'>
                        <Copy className='w-[22px] h-[22px]' />
                      </button>
                      <button onClick={()=>viewPaste(paste._id)} className='border border-gray-300 p-1 rounded-[0.2rem]'>
                        <Eye className='w-[22px] h-[22px]' />
                      </button>
                      <button onClick={()=>{dispatch(removeFromPastes(idx))}} className='border border-gray-300 p-1 rounded-[0.2rem]'>
                        <Trash2 className='w-[22px] h-[22px]' />
                      </button>
                      <button onClick={()=>handleShare(paste)} className='border border-gray-300 p-1 rounded-[0.2rem]'>

                        <Share className='w-[22px] h-[22px]' />
                        
                      </button>
                    </div>

                    <div className='flex  gap-x-1'>
                      <Calendar className='w-[21px] h-[21px] ' />
                      <p>{FormatDate(paste.createdAt)}</p>
                    </div>

                  </div>

                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Pastes
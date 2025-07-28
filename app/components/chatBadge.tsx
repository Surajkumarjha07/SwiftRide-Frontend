import { MessageCircleIcon, MessagesSquareIcon } from 'lucide-react'
import React from 'react'
import { useAppDispatch } from '../redux/hooks'
import { setOpenChat } from '../redux/slices/chat';

export default function ChatBadge() {
    const dispatch = useAppDispatch();

    function openChat(e: React.MouseEvent) {
        e.preventDefault();

        dispatch(setOpenChat(true));
    }

    return (
        <div className={`z-30 bg-white shadow-lg rounded-xl px-3 py-2 w-fit flex gap-4 items-center cursor-pointer`} onClick={openChat}>
            <MessageCircleIcon size={35} className='text-gray-700 pointer-events-none'/>
        </div>
    )
}

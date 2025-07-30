import { MessageCircleIcon } from 'lucide-react'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setOpenChat } from '../redux/slices/chat';
import { clearMessagesToRead } from '../redux/slices/messages';

export default function ChatBadge() {
    const dispatch = useAppDispatch();
    const messagesToRead = useAppSelector(state => state.Messages.messagesToRead)
    const showChatBadge = useAppSelector(state => state.Chat.showChatBadge);

    function openChat(e: React.MouseEvent) {
        e.preventDefault();

        dispatch(setOpenChat(true));
        dispatch(clearMessagesToRead());
    }

    return (
        <div className={`${showChatBadge ? "visible" : "hidden"} relative z-30 bg-white shadow-lg rounded-xl px-3 py-2 w-fit flex gap-4 items-center cursor-pointer`} onClick={openChat}>
            <div className='bg-gray-200 rounded-md w-5 h-5 absolute -top-1 -right-2'>
                <p className='flex justify-center items-center w-full h-full font-medium text-sm'>
                    {
                        messagesToRead
                    }
                </p>
            </div>
            <MessageCircleIcon size={35} className='text-gray-700 pointer-events-none' />
        </div>
    )
}

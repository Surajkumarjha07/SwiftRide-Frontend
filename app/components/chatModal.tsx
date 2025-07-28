import React, { useEffect, useState } from 'react'
import { CrossIcon, Plus, SendIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setOpenChat } from '../redux/slices/chat';
import { useSocket } from '../contexts/socketContext';

export default function ChatModal() {
    const [messageArr, setMessageArr] = useState<{ from: string, msg: string }[]>([]);
    const [message, setMessage] = useState("");
    const dispatch = useAppDispatch();
    const isChatOpen = useAppSelector(state => state.Chat.isChatOpen);
    const userName = useAppSelector(state => state.User.userName);
    const rideData: any = useAppSelector(state => state.Rides.rideData);
    const role = useAppSelector(state => state.User.role);
    const userId = useAppSelector(state => state.User.userId);
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            const handleMessageArrived = ({ userName, message }: { userName: string, message: string }) => {
                setMessageArr(prev => [...prev, { from: userName, msg: message }]);
            };

            socket.on("messageArrived", handleMessageArrived);

            return () => {
                socket.off("messageArrived", handleMessageArrived);
            };
        }

    }, [socket, messageArr]);

    const closeChatModal = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatch(setOpenChat(false));
    }

    const sendMessage = (e: React.MouseEvent) => {
        e.preventDefault();

        if (socket && message !== "") {
            let toId: string = "";
            const fromId: string = userId;

            if (rideData) {
                toId = role === "user" ? rideData.captainId : rideData.userId;
            }

            socket.emit('message', { userName, message, fromId, toId });
        }
        setMessage("");
    }

    return (
        <aside className={`bg-white shadow-sm shadow-gray-400 ${isChatOpen ? 'opacity-100 h-[28rem] z-50' : 'opacity-0 h-0 -z-10'} w-80 flex flex-col rounded-2xl overflow-hidden transition-all duration-500`}>

            <div className='flex justify-between items-center px-4 py-4'>
                <p className={`text-gray-700 font-medium text-xl`}> Messages </p>
                <button onClick={closeChatModal}>
                    <Plus className={`rotate-45 cursor-pointer text-gray-800`} />
                </button>
            </div>

            <div className='w-full overflow-y-scroll flex-1 px-4 overflow-x-hidden'>

                {
                    messageArr.map(({ from, msg }, index) => (
                        <div key={index} className={`my-3 px-3 py-2 rounded-xl w-full bg-gray-100`}>
                            <p className='text-gray-600 text-[11px] font-semibold'> {from} </p>
                            <p className='text-gray-700 text-[13px] font-semibold mt-1'> {msg} </p>
                        </div>
                    ))
                }

            </div>

            <div className={`flex items-center px-4 py-4`}>
                {
                    <div className="relative w-full h-fit overflow-hidden">
                        <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-4/5 rounded-full flex justify-center items-center cursor-pointer transition-all duration-200 ${message ? "rotate-0" : "rotate-45"}`} onClick={sendMessage}>
                            <SendIcon className={message ? "text-blue-600" : "text-gray-400"} />
                        </button>

                        <input
                            type="text" name='message' value={message}
                            className={`text-black bg-gray-100 placeholder:text-gray-600 border-gray-500 w-full h-12 pr-14 pl-6 outline-none border-2 py-2 rounded-full placeholder:font-medium`}
                            placeholder="Enter message here" onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                }

            </div>

        </aside>
    )
}

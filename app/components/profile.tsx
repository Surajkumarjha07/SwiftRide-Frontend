import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setIsProfileOpen } from '../redux/slices/profile';

export default function Profile() {
    const dispatch = useAppDispatch();

    return (
        <section className="absolute top-3 right-5 z-30 bg-white shadow-lg rounded-2xl px-6 py-4 w-fit flex gap-4 items-center">

            <div className="profile w-14 h-14 rounded-full bg-gradient-to-tr from-red-400 to-red-600 flex items-center justify-center text-white font-semibold text-xl cursor-pointer" onClick={() => dispatch(setIsProfileOpen(true))}>
                <p className='pointer-events-none'>
                    Y
                </p>
            </div>

        </section>
    );
}

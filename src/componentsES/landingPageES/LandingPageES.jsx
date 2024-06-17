import React from 'react'
import BLogo from '../../assets/Beecker_Logo_Alta 1.png'
import LoginES from "./LoginES";

const LandingPage = () => {
    return (
        <div className='flex w-full h-screen'>
            <div className='hidden lg:flex h-full w-1/2 items-center justify-center'>
                <div className='flex w-2/3 max-w-sm justify-center items-center'>
                    <img src={BLogo} alt='logo' className='max-w-full h-autoß'/>
                </div>
            </div>
            <div className='w-full flex items-center justify-center lg:w-1/2 min-h-screen'>
                <LoginES/>
            </div>
        </div>
    )
}

export default LandingPage;
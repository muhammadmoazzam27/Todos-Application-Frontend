import React from 'react'

const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className='bg-[#1d3557] text-white border-t border-gray-200 py-3'>
            <div className='text-center'>
                <p className='mb-0'> <span className='font-bold'>&copy; {year}.</span> All Rights Reserved. </p>
            </div>
        </footer>
    )
}

export default Footer
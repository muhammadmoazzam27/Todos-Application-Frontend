import React from 'react'

const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className='bg-white border-t border-gray-200 py-3'>
            <div className='text-center'>
                <p className='mb-0'>&copy; {year}. All Rights Reserved. </p>
            </div>
        </footer>
    )
}

export default Footer
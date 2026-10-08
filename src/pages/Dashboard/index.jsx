import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserDashboard from './User-Dashboard'
import AddTodo from './Add-Todo'

const Dashboard = () => {
    return (
        <>
            <Routes>
                <Route path='home-overview' element={<UserDashboard />} />
                <Route path='add-todo' element={<AddTodo />} />
            </Routes>
        </>
    )
}

export default Dashboard
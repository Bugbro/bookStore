import React from 'react'

import DashboardContent from '../components/DashboardContent.jsx'
import { TopNavBar } from '../components/TopNavBar.jsx'

export const Dashboard = () => {

    return (
        <div >
            <TopNavBar />
            <DashboardContent />
        </div>
    )
}
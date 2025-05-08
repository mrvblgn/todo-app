import React from 'react';
import { Link } from 'react-router-dom';
import DashboardComp from "@/components/todo/DashboardComp";

const Dashboard = () => (
    <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <DashboardComp />
                <Link 
                    to="/" 
                    className="inline-block mt-4 text-blue-500 hover:text-blue-700"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    </div>
);

export default Dashboard;

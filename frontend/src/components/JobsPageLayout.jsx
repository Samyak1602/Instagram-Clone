import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import JobsPage from './JobsPage';

const JobsPageLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/5 border-r border-gray-300">
        <LeftSidebar />
      </div>

      {/* Jobs Page Content */}
      <div className="flex-1 mx-auto max-w-4xl p-6">
        <JobsPage />
      </div>

      {/* Right Sidebar */}
      <div className="w-1/5 border-l border-gray-300">
        <RightSidebar />
      </div>
    </div>
  );
};

export default JobsPageLayout;

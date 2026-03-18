import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from './../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';
import Header from '@/components/custom/Header';

import Spline from "@splinetool/react-spline";

function Dashboard() {

  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumeList()
  }, [user])
  
  // Used to get Users resume list
  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data);
      })
  }


  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Resume</h2>
      <p className="dashboard-subtitle">
        Start Creating AI resume to your next job role
      </p>

      <div className="dashboard-grid">
        <AddResume />
        {resumeList.length > 0
          ? resumeList.map((resume) => (
              <ResumeCardItem
                resume={resume}
                key={resume.id} // keep your original key (better)
                refreshData={GetResumeList} // keep original function
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>

      {/* <div className="spline-bg">
        <Spline scene="https://prod.spline.design/7ocvPI1GU5J1mmGg/scene.splinecode" />
      </div> */}
    </div>
  );
}

export default Dashboard

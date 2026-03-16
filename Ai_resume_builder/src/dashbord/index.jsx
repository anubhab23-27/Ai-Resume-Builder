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
    <div className="p-10 md:px-20 lg:px-32 gradiant h-screen overflow-hidden">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume) => (
            <ResumeCardItem
              resume={resume}
              key={resume.id}
              refreshData={GetResumeList}
            />
          ))}
      </div>

      <div className="absolute -bottom-20 right-0 w-[620px] pointer-events-none select-none overflow-hidden">
        <Spline scene="https://prod.spline.design/7ocvPI1GU5J1mmGg/scene.splinecode" />
      </div>
    </div>
  );
}

export default Dashboard

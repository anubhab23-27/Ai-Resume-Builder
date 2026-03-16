import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashbord/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeid } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeid).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
      text: "Check out my resume!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        alert("Sharing not supported on this browser");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            {resumeInfo?.firstName}'s resume{" "}
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            resume url{" "}
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            <Button onClick={handleShare}>Share</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;

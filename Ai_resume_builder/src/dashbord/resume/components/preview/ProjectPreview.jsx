import React from "react";

function ProjectPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Projects
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.project?.map((project, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {project?.project_title}
          </h2>
          
          {/* <p className="text-xs my-2">{project.project_description}</p> */}
          <div
            className="resume-preview text-xs my-2"
            dangerouslySetInnerHTML={{ __html: project?.project_description }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;

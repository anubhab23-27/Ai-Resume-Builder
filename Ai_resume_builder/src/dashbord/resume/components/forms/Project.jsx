import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const formField = {
  project_title: "",
  project_description: "",
};
function Project() {
  const [projectList, setprojectList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo?.project.length > 0 &&
      setprojectList(resumeInfo?.project);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setprojectList(newEntries);
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = projectList.slice();
    newEntries[index][name] = e.target.value;

    setprojectList(newEntries);
  };

  const AddNewproject = () => {
    setprojectList([...projectList, formField]);
  };

  const Removeproject = () => {
    setprojectList((projectList) => projectList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        project: projectList.map(({ id, ...rest }) => rest),
      },
    };
    console.log(projectList);
    GlobalApi.UpdateResumeDetail(params.resumeid, data)
      .then(() => {
        setLoading(false);
        toast("Details updated !");
      })
      .catch((error) => {
        console.log(error.response?.data);
        setLoading(false);
        toast("Server Error, Please try again!");
      });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      project: projectList,
    });
  }, [projectList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p>Showcase your technical and academic projects.</p>
        <div>
          {projectList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Project Title</label>
                  <Input
                    name="project_title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.project_title}
                  />
                </div>
                <div className="col-span-2">
                  {/* Project Summery  */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.project_description}
                    titleField="project_title"
                    section="project"
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "project_description", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewproject}
              className="text-primary"
            >
              {" "}
              + Add More project
            </Button>
            <Button
              variant="outline"
              onClick={Removeproject}
              className="text-primary"
            >
              {" "}
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Project;

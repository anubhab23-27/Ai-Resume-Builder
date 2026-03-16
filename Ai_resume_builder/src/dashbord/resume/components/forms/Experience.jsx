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
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};
function Experience({ onNoExperience, onHasExperience, setEnableNext }) {
  const [experinceList, setExperinceList] = useState([formField]);
  const [noExperience, setNoExperience] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.noExperience) {
      setNoExperience(true);
      setExperinceList([]);
      setEnableNext?.(true);
      return;
    }

    if (resumeInfo?.experience?.length > 0) {
        setExperinceList(resumeInfo.experience);
        setEnableNext?.(true);
      }
    }, [resumeInfo, setEnableNext]);
  const updateExperienceState = (newEntries, experienceFlag = noExperience) => {
    setExperinceList(newEntries);
    setResumeInfo((prev) => ({
      ...prev,
      experience: newEntries,
      noExperience: experienceFlag,
    }));
  };

  const handleChange = (index, event) => {
    const newEntries = experinceList.map((entry, i) =>
      i === index ? { ...entry, [event.target.name]: event.target.value } : entry,
    );
    updateExperienceState(newEntries);
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experinceList.map((entry, i) =>
      i === index ? { ...entry, [name]: e.target.value } : entry,
    );
    updateExperienceState(newEntries);
  };

  const AddNewExperience = () => {
    const newEntries = [...experinceList, formField];
    updateExperienceState(newEntries);
  };

  const RemoveExperience = () => {
    const newEntries = experinceList.slice(0, -1);
    updateExperienceState(newEntries);
  };

  const handleNoExperienceToggle = async (event) => {
    const checked = event.target.checked;
    setNoExperience(checked);

    if (checked) {
      const updatedInfo = {
        ...resumeInfo,
        experience: [],
        noExperience: true,
      };
      setExperinceList([]);
      setResumeInfo(updatedInfo);
      setEnableNext?.(true);
      onNoExperience?.();

      // auto-save state with no experience
      await onSave([], true);
    } else {
      const updatedInfo = {
        ...resumeInfo,
        experience: [formField],
        noExperience: false,
      };
      setExperinceList([formField]);
      setResumeInfo(updatedInfo);
      setEnableNext?.(true);
      onHasExperience?.();

      // auto-save state with experience placeholder
      await onSave([formField], false);
    }
  };

  const onSave = async (saveExperience = experinceList, saveNoExperience = noExperience) => {
    setLoading(true);

    const normalizedExperience = (saveExperience || []).map(({ id, ...rest }) => rest);

    const data = {
      data: {
        experience: normalizedExperience,
      },
    };

    try {
      await GlobalApi.UpdateResumeDetail(params.resumeid, data);
      setResumeInfo({
        ...resumeInfo,
        experience: normalizedExperience,
        noExperience: saveNoExperience,
      });
      toast("Details updated !");
    } catch (error) {
      console.log(error.response?.data);
      toast("Server Error, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  // Remove the previous automatic setResumeInfo effect to prevent re-render loops.
  // State sync is now handled in updateExperienceState and handleNoExperienceToggle.

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div className="flex items-center gap-2 mt-2 mb-4">
          <input
            id="no-experience"
            type="checkbox"
            checked={noExperience}
            onChange={handleNoExperienceToggle}
            className="rounded border-gray-300 h-4 w-4"
          />
          <label htmlFor="no-experience" className="text-sm">
            I have no professional experience
          </label>
        </div>
        {!noExperience && (
          <>
            <div>
              {experinceList.map((item, index) => (
                <div key={index}>
                  <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                    <div>
                      <label className="text-xs">Position Title</label>
                      <Input
                        name="title"
                        onChange={(event) => handleChange(index, event)}
                        defaultValue={item?.title}
                      />
                    </div>
                    <div>
                      <label className="text-xs">Company Name</label>
                      <Input
                        name="companyName"
                        onChange={(event) => handleChange(index, event)}
                        defaultValue={item?.companyName}
                      />
                    </div>
                    <div>
                      <label className="text-xs">City</label>
                      <Input
                        name="city"
                        onChange={(event) => handleChange(index, event)}
                        defaultValue={item?.city}
                      />
                    </div>
                    <div>
                      <label className="text-xs">State</label>
                      <Input
                        name="state"
                        onChange={(event) => handleChange(index, event)}
                        defaultValue={item?.state}
                      />
                    </div>
                    <div>
                      <label className="text-xs">Start Date</label>
                      <Input
                        type="date"
                        name="startDate"
                        onChange={(event) => handleChange(index, event)}
                        defaultValue={item?.startDate}
                      />
                    </div>
                    <div>
                      <label className="text-xs">End Date</label>
                      <Input
                        type="date"
                        name="endDate"
                        onChange={(event) => handleChange(index, event)}
                        defaultValue={item?.endDate}
                      />
                    </div>
                    <div className="col-span-2">
                      <RichTextEditor
                        index={index}
                        defaultValue={item?.workSummery}
                        onRichTextEditorChange={(event) =>
                          handleRichTextEditor(event, "workSummery", index)
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
                  onClick={AddNewExperience}
                  className="text-primary"
                >
                  + Add More Experience
                </Button>
                <Button
                  variant="outline"
                  onClick={RemoveExperience}
                  className="text-primary"
                >
                  - Remove
                </Button>
              </div>
            </div>
          </>
        )}

        {noExperience && (
          <div className="text-sm text-slate-600 my-3">
            Resume preview will skip the experience section.
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;

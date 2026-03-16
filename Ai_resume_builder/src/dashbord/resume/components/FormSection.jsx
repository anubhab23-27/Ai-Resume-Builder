import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import Project from "./forms/Project";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const [noExperience, setNoExperience] = useState(false);
  const params = useParams();

  const handleNoExperience = () => {
    setNoExperience(true);
    setEnableNext(true);
    setActiveFormIndex(4); // skip to Education
  };

  const handleHasExperience = () => {
    setNoExperience(false);
    setEnableNext(true);
  };

  const handleEnableNext = (value) => {
    setEnableNext(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <ThemeColor />
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Details */}
      {activeFormIndex == 1 ? (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience
          onNoExperience={handleNoExperience}
          onHasExperience={handleHasExperience}
          setEnableNext={handleEnableNext}
        />
      ) : activeFormIndex == 4 ? (
        <Project/>
      ) : activeFormIndex == 5 ? (
        <Education />
      ) : activeFormIndex == 6 ? (
        <Skills />
      ) : activeFormIndex == 7 ? (
        <Navigate to={"/my-resume/" + params.resumeid + "/view"} />
      ) : null}
    </div>
  );
}

export default FormSection;

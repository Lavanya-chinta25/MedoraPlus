import React, { useState } from "react";
import { jobStreams, jobTitlesMap } from "./jobData.js"; // Import data from jobData.js
import temp1 from "../assets/temp1.jpg";
import temp2 from "../assets/temp2.jpg";
import temp3 from "../assets/temp3.jpg";

const CandidateRegistration = () => {
  const [jobStream, setJobStream] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitles, setJobTitles] = useState([]);
  const [templates, setTemplates] = useState([]);

  const templateImages = {
    temp1,
    temp2,
    temp3,
  };

  const handleJobStreamChange = (e) => {
    const selectedStream = e.target.value;
    setJobStream(selectedStream);
    setJobTitles(jobTitlesMap[selectedStream] || []);
    setJobTitle("");
    setTemplates([]); // Reset templates when job stream changes
  };

  const handleJobTitleChange = (e) => {
    const selectedTitle = e.target.value;
    setJobTitle(selectedTitle);
    if (selectedTitle) {
      // Load templates when job title is selected
      setTemplates(["temp1", "temp2", "temp3"]);
    } else {
      setTemplates([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Candidate Registration
        </h2>
        <form className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="jobStream"
              className="block text-sm font-medium text-gray-700"
            >
              Select Job Stream
            </label>
            <select
              id="jobStream"
              value={jobStream}
              onChange={handleJobStreamChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">-- Select a Stream --</option>
              {jobStreams.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Select Job Title
            </label>
            <select
              id="jobTitle"
              value={jobTitle}
              onChange={handleJobTitleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              disabled={!jobStream}
            >
              <option value="">-- Select a Title --</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-700">
            {jobTitle
              ? `The following are the templates for ${jobStream} and ${jobTitle}:`
              : "Select job stream and job title to view the related templates."}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {templates.map((template, index) => (
                <img
                key={index}
                src={templateImages[template]}
                alt={`Template ${index + 1}`}
                className="w-full h-auto rounded shadow"
                
                />
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistration;

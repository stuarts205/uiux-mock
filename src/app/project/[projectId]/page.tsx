"use client";
import React, { useEffect, useState } from "react";
import ProjectHeader from "./_shared/project-header";
import SettingsSection from "./_shared/settings-section";
import axios from "axios";
import { useParams } from "next/navigation";
import { ProjectType, ScreenConfig } from "@/type/type";
import { Loader2Icon } from "lucide-react";

const ProjectCanvasPlayground = () => {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("Loading...");

  useEffect(() => {
    projectId && getProjectDetail();
  }, [projectId]);

  const getProjectDetail = async () => {
    setLoading(true);
    setLoadingMsg("Loading...");
    const result = await axios.get(`/api/project?projectId=${projectId}`);
    console.log(result.data);
    setProjectDetail(result.data?.projectDetail);
    setScreenConfig(result.data?.screenConfig);
    // if(result.data?.screenConfig?.length===0){
    //   generateScreenConfig()
    // }
    setLoading(false);
  };

  useEffect(() => {
    if (projectDetail && screenConfig && screenConfig.length === 0) {
      generateScreenConfig();
    } else if (projectDetail && screenConfig) {
      genterateScreenUi();
    }
  }, [projectDetail && screenConfig]);

  const generateScreenConfig = async () => {
    setLoading(true);
    setLoadingMsg("Generating Screen Config...");
    const result = await axios.post("/api/generate-config", {
      userInput: projectDetail?.userInput,
      deviceType: projectDetail?.device,
      projectId: projectId,
    });
    console.log(result.data);
    getProjectDetail();
    setLoading(false);
  };

  const genterateScreenUi = async () => {
    setLoading(true);

    for (let index = 0; index < screenConfig.length; index++) {
      const screen = screenConfig[index];
      if (screen?.code) continue;
      setLoadingMsg(`Generating UI for ${index + 1}...`);
      const result = await axios.post("/api/generate-screen-ui", {
        projectId,
        screenId: screen?.screenId,
        screenName: screen?.screenName,
        purpose: screen?.purpose,
        screenDecsription: screen?.screenDescription,
      });
      
      setScreenConfig((prev) =>
        prev.map((item, i) => (i === index ? result.data : item)),
      );
    }

    setLoading(false);
  };

  return (
    <div>
      <ProjectHeader />
      <div>
        {loading && (
          <div className="p-3 absolute bg-blue-300/20 border border-blue-400 rounded-xl left-1/2 top-20">
            <h2 className="flex items-center gap-2 text-sm">
              <Loader2Icon className="animate-spin" /> {loadingMsg}
            </h2>
          </div>
        )}
        <SettingsSection projectDetail={projectDetail} />
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;

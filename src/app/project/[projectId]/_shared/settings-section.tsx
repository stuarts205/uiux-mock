"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { THEME_NAME_LIST, THEMES } from "@/data/themes";
import { ProjectType, ScreenConfig } from "@/type/type";
import { Camera, CameraIcon, Share, SparkleIcon, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

type SettingsSectionProps = {
  projectDetail: ProjectType | undefined;
}

const SettingsSection = ({ projectDetail }: SettingsSectionProps) => {
  const [selectedTheme, setSelectedTheme] = useState("AURORA_INK");
  const [projectName, setProjectName] = useState(projectDetail?.projectName || "");
  const [userNewScreeInput, setUserNewScreeInput] = useState<string>();

  useEffect(() => {
    projectDetail && setProjectName(projectDetail?.projectName || "");
  }, [projectDetail]);

  return (
    <div className="w-75 h-[90vh] p-5 border-r">
      <h2 className="font-medium text-lg">Settings</h2>

      <div className="mt-3">
        <h2 className="text-sm mb-1">Project Name</h2>
        <Input
          placeholder="Project Name"
          onChange={(event) => setProjectName(event.target.value)}
          value={projectName}
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm mb-1">Generate New Screen</h2>
        <Textarea
          placeholder="Enter Prompt to generate screen using AI"
          onChange={(event) => setUserNewScreeInput(event.target.value)}
        />
        <Button size={"sm"} className="mt-2 w-full">
          {" "}
          <Sparkles /> Generate With AI
        </Button>
      </div>
      <div className="mt-5">
        <h2 className="text-sm mb-1">Themes</h2>
        <div className="h-87.5 overflow-auto">
          <div>
            {THEME_NAME_LIST.map((theme, index) => (
              <div
                className={`p-3 border rounded-xl mb-2 
                    ${
                      theme === selectedTheme && "border-primary bg-primary/20"
                    }`}
                onClick={() => setSelectedTheme(theme)}
                key={index}
              >
                <h2>{theme}</h2>
                <div className="flex gap-2">
                  <div
                    className={`h-4 w-4 rounded-full `}
                    style={{ background: THEMES[theme].primary }}
                  />
                  <div
                    className={`h-4 w-4 rounded-full `}
                    style={{ background: THEMES[theme].secondary }}
                  />
                  <div
                    className={`h-4 w-4 rounded-full `}
                    style={{ background: THEMES[theme].accent }}
                  />
                  <div
                    className={`h-4 w-4 rounded-full `}
                    style={{ background: THEMES[theme].background }}
                  />
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      background: `linear-gradient(
                      135deg,
                    ${THEMES[theme].background},
                    ${THEMES[theme].primary},
                    ${THEMES[theme].accent}
                    )`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-sm mb-1">Extras</h2>
        <div className="flex gap-3  ">
          <Button size={"sm"} variant={"outline"} className="mt-2">
            {" "}
            <Camera /> Screenshot
          </Button>
          <Button size={"sm"} variant={"outline"} className="mt-2">
            {" "}
            <Share /> Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;

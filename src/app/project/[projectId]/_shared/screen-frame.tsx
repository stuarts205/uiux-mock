import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Rnd } from "react-rnd";
import { GripVerticalIcon } from "lucide-react";
import { themeToCssVars } from "@/data/themes";
import { ProjectType } from "@/type/type";

interface ScreenFrameProps {
  x: number;
  y: number;
  setPanningEnabled: (enabled: boolean) => void;
  width: number;
  height: number;
  htmlCode: string | undefined;
  projectDetail: ProjectType | undefined;
}

function ScreenFrame({
  x,
  y,
  setPanningEnabled,
  width,
  height,
  htmlCode,
  projectDetail,
}: ScreenFrameProps) {
  const html = `
    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">


    <!-- Tailwind + Iconify -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
    <style >
        ${themeToCssVars(projectDetail?.theme)}
    </style>
    </head>
    <body class="bg-[var(--background)] text-[var(--foreground)] w-full">
    ${htmlCode ?? ""}
    </body>
    </html>
    `;

  return (
    <Rnd
      default={{
        x,
        y,
        width: width,
        height: height,
      }}
      dragHandleClassName="drag-handle"
      enableResizing={{
        bottomRight: true,
        bottomLeft: true,
      }}
      onDragStart={() => setPanningEnabled(false)}
      onDragStop={() => setPanningEnabled(true)}
      onResizeStart={() => setPanningEnabled(false)}
      onResizeStop={() => setPanningEnabled(true)}
    >
      <div className="drag-handle cursor-move flex gap-2 bg-white rounded-lg items-center p-2">
        <GripVerticalIcon className="text-gray-500 w-4 h-4" /> Drag Here
      </div>
      <iframe
        className="w-full h-[calc(100%-40px)] bg-white rounded-2xl mt-5"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={html}
      />
    </Rnd>
  );
}

export default ScreenFrame;

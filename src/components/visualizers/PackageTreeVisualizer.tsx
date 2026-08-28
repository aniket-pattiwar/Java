import React from 'react';
import { Folder, FileCode } from 'lucide-react';


export const PackageTreeVisualizer: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="border-b border-slate-100 pb-2">
        <h4 className="font-bold text-sm text-slate-800">Package Hierarchy & Disk Directory Mapping</h4>
        <p className="text-xs text-slate-500">How Java packages map 1-to-1 to OS folder directories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Directory Folder Tree */}
        <div className="bg-slate-900 text-slate-200 p-4 rounded-xl space-y-1.5 overflow-x-auto">
          <div className="text-slate-400 text-[10px] font-sans font-bold uppercase tracking-wider mb-2">
            Disk Directory Structure
          </div>
          <div className="flex items-center gap-1.5 text-blue-400">
            <Folder className="w-3.5 h-3.5" /> <span>src/</span>
          </div>
          <div className="pl-4 flex items-center gap-1.5 text-blue-400">
            <Folder className="w-3.5 h-3.5" /> <span>com/</span>
          </div>
          <div className="pl-8 flex items-center gap-1.5 text-blue-400">
            <Folder className="w-3.5 h-3.5" /> <span>training/</span>
          </div>
          <div className="pl-12 flex items-center gap-1.5 text-amber-400">
            <Folder className="w-3.5 h-3.5" /> <span>model/</span>
          </div>
          <div className="pl-16 flex items-center gap-1.5 text-emerald-300 font-bold">
            <FileCode className="w-3.5 h-3.5" /> <span>Student.java</span>
          </div>
          <div className="pl-12 flex items-center gap-1.5 text-amber-400">
            <Folder className="w-3.5 h-3.5" /> <span>service/</span>
          </div>
          <div className="pl-16 flex items-center gap-1.5 text-emerald-300 font-bold">
            <FileCode className="w-3.5 h-3.5" /> <span>StudentService.java</span>
          </div>
        </div>

        {/* Corresponding Java Code Statements */}
        <div className="space-y-3 font-sans text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-800">Inside Student.java:</span>
            <div className="font-mono bg-white p-2 rounded border border-slate-200 text-blue-800 text-[11px]">
              package com.training.model;
            </div>
            <p className="text-[11px] text-slate-500">Declares membership in package com.training.model.</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <span className="font-bold text-slate-800">Inside StudentService.java:</span>
            <div className="font-mono bg-white p-2 rounded border border-slate-200 text-purple-800 text-[11px]">
              package com.training.service;<br />
              import com.training.model.Student;
            </div>
            <p className="text-[11px] text-slate-500">Imports Student across package boundaries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

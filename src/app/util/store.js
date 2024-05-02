import {create} from "zustand";

export const useProjectsStore = create((set) => (
  {
    projects: [],
    updateProjects: (newProjects) => set({projects: newProjects})
  }
));

export const useNodeStore = create((set) => (
  {
    selectedNode: undefined,
    setSelectedNode: (node) => set({selectedNode: node})
  }
));
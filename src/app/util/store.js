import {create} from "zustand";

export const useProjectsStore = create((set) => (
  {
    projects: [],
    updateProjects: (newProjects) => set({projects: newProjects})
  }
))
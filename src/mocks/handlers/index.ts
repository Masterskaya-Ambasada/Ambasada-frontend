import { commonHandlers } from "./common";
import { projectHandlers } from "./projects";

export const handlers = [...commonHandlers, ...projectHandlers];

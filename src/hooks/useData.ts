import { Screen } from "../type";
import past from "../data/pastProjects.json";
import present from "../data/currentSkills.json";
import future from "../data/futurePlans.json";

export const useData = (screen: Screen) => {
  switch (screen) {
    case Screen.past:
      return past;
    case Screen.present:
      return present;
    case Screen.future:
      return future;
  }
};

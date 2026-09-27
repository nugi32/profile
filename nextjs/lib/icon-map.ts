import type { IconType } from "react-icons";
import {
  LuSquareTerminal,
  LuLink2,
  LuChartLine,
  LuNotebookPen,
  LuBrain,
  LuBookOpen,
  LuFileText,
  LuStickyNote,
  LuFolderCheck,
  LuClock,
  LuCode,
  LuPenLine,
  LuFlame,
  LuNetwork,
  LuServer,
  LuDatabase,
  LuTelescope,
  LuCompass,
  LuFlaskConical,
} from "react-icons/lu";

export const iconMap: Record<string, IconType> = {
  terminal: LuSquareTerminal,
  chain: LuLink2,
  chart: LuChartLine,
  notebook: LuNotebookPen,
  brain: LuBrain,
  book: LuBookOpen,
  paper: LuFileText,
  note: LuStickyNote,
  project: LuFolderCheck,
  clock: LuClock,
  code: LuCode,
  pen: LuPenLine,
  flame: LuFlame,
  web3: LuNetwork,
  backend: LuServer,
  quant: LuDatabase,
  infra: LuDatabase,
  telescope: LuTelescope,
  compass: LuCompass,
  flask: LuFlaskConical,
};

export function getIcon(key: string): IconType {
  return iconMap[key] ?? LuCompass;
}

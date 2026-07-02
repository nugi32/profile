import type { IconType } from "react-icons";
import {
  LuTerminalSquare,
  LuLink2,
  LuLineChart,
  LuNotebookPen,
  LuBrain,
  LuBookOpen,
  LuFileText,
  LuStickyNote,
  LuFolderCheck,
  LuClock,
  LuCode2,
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
  terminal: LuTerminalSquare,
  chain: LuLink2,
  chart: LuLineChart,
  notebook: LuNotebookPen,
  brain: LuBrain,
  book: LuBookOpen,
  paper: LuFileText,
  note: LuStickyNote,
  project: LuFolderCheck,
  clock: LuClock,
  code: LuCode2,
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

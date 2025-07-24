import {convertFileSrc} from "@tauri-apps/api/core";
import {normalizePath} from "@/js/modules/tauri/files/path";

export const filePathToUrl = (path: string) => convertFileSrc(normalizePath(path));

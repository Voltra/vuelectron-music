import Modal from "vue-js-modal"
import { Photoshop as PhotoshopColorPicker } from "vue-color"

import App from "@components/App"
import TopBar from "@components/TopBar"
import Dispatcher from "@components/Dispatcher"
import DragDrop from "@components/DragDrop"
import DesktopPlayer from "@components/DesktopPlayer"
import ColorChanger from "@components/ColorChanger"
import SettingsMenu from "@components/SettingsMenu"
import Playlist from "@components/Playlist"
import PlaylistItem from "@components/PlaylistItem"
import PlaylistItemCell from "@components/PlaylistItemCell"


import "@css/globals"

const components = {
    Modal,
    PhotoshopColorPicker,

    App,
    TopBar,
    Dispatcher,
    DragDrop,
    DesktopPlayer,
    ColorChanger,
    SettingsMenu,
    Playlist,
    PlaylistItem,
    PlaylistItemCell,
};

const componentsArray = Object.values(components);

export {components, componentsArray};
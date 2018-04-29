import { ClientTable } from "vue-tables-2"
import Modal from "vue-js-modal"
import { Photoshop as PhotoshopColorPicker } from "vue-color"

import App from "@components/App"
import TopBar from "@components/TopBar"
import Dispatcher from "@components/Dispatcher"
import DragDrop from "@components/DragDrop"
import DesktopPlayer from "@components/DesktopPlayer"


import "@css/globals"

const components = {
    ClientTable,
    Modal,
    PhotoshopColorPicker,

    App,
    TopBar,
    Dispatcher,
    DragDrop,
    DesktopPlayer
};

const componentsArray = Object.values(components);

export {components, componentsArray};
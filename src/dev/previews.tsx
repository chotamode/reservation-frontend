import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import LandingPage from "../pages/LandingPage";
import AuthButton from "../components/auth/AuthButton";
import AppointmentWindow from "../components/AppointmentWindow";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/LandingPage">
                <LandingPage/>
            </ComponentPreview>
            <ComponentPreview path="/AuthButton">
                <AuthButton/>
            </ComponentPreview>
            <ComponentPreview path="/AppointmentWindow">
                <AppointmentWindow/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
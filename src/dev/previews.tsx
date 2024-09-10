import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import LandingPage from "../pages/LandingPage";
import AuthButton from "../components/auth/AuthButton";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/LandingPage">
                <LandingPage/>
            </ComponentPreview>
            <ComponentPreview path="/AuthButton">
                <AuthButton/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
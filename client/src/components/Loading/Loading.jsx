import { StyledLoadingComponent } from "./Loading.styled"
import Lottie from "react-lottie"
import { flatten } from "lottie-colorify"

import loadingAnimation from "../../lotties/loadingAnimation.json"
import { useSelector } from "react-redux"

const Loading = ({ text, color, bg }) => {
    const theme = useSelector((state) => state.theme.selectedTheme)

    const loadingAnimOptions = {
        loop: true,
        autoplay: true,
        animationData: flatten(color || theme.text.light, loadingAnimation),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <StyledLoadingComponent theme={theme} bg={bg}>
            <span className="text">{text || "Loading"}</span>
            <span className="animation">
                <Lottie options={loadingAnimOptions} height={400} width={400} />
            </span>
        </StyledLoadingComponent>
    )
}

export default Loading

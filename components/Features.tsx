import { useSelector } from "react-redux";
import { ToolState } from "../src/store";
import ArrowIcon from "./icons/ArrowIcon";
import { HiLanguage } from "react-icons/hi2";
import UserFreindly from "./icons/UserFreindly";

export const Features = ({ features }: {
    features: { title: string; description: string }[];
}) => {
    const stateShowTool = useSelector(
        (state: { tool: ToolState }) => state.tool.showTool
    );
    const icons = [ArrowIcon, HiLanguage, UserFreindly]
    return (
        <div className={`features${stateShowTool ? "" : " d-none"}`}>
            {features.map(({ title, description }, i) => {
                const Icon = icons[i];
                return (
                    <div className="feature">
                        <Icon className="feature-icon" />
                        <div className="title">{title}</div>
                        <p className="description">{description}</p>
                    </div>
                )
            })}
        </div>
    )
}
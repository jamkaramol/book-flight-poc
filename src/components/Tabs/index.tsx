import React, { useEffect, useState } from "react";
import Tab from "../Tab";
import './tabs.scss';
import { useHistory } from "react-router-dom";

const Tabs = ({ routes }: any) => {
    let history: any = useHistory();
    const [activeTab, setActiveTab] = useState(history.location.pathname)

    useEffect(() => {
        setActiveTab(history.location.pathname);
    }, [history.location.pathname]);

    const onClickTabItem = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <div  data-testid="tab-factory" className="tabs">
            <ol className="tab-list">
                {routes.map((route: any) => {
                    return (
                        <Tab
                            activeTab={activeTab}
                            key={route.path}
                            label={route.name}
                            path={route.path}
                            icon={route.icon}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </ol>
        </div>
    );
}

export default Tabs;

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import KanbanDesk from "../components/kanban-desk/KanbanDesk";
import {toAbsoluteUrl} from "../utils/utils";

const RouteList = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<KanbanDesk title="Kanban Desk" icon={toAbsoluteUrl("assets/kanban-desk/icon.png")} />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default RouteList
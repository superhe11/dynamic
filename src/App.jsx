import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListItemsPage } from './pages/ListItem/ListItemsPage';
import { CreateItemPage } from './pages/CreateItemPage/CreateItemPage';
import { EditItemPage } from './pages/EditItemPage/EditItemPage';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListItemsPage />} />
                <Route path="/create" element={<CreateItemPage />} />
                <Route path="/edit/:id" element={<EditItemPage />} />
            </Routes>
        </Router>
    );
};

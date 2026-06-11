import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function PublicLayout() {
    return (
        <>
            <Header />
            <main style={{ minHeight: 'calc(100vh - 76px - 120px)' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default PublicLayout;

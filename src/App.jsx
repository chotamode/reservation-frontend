import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.jsx';
import PsychologistProfilePage from './pages/PsychologistProfilePage.jsx';
import UpdateUserDetails from './pages/UpdateUserDetails.jsx';
import UpdatePsychologistDetails from './pages/UpdatePsychologistDetails.jsx';
import useAuth from './hooks/useAuth.js';
import config from "./config.js";
import CreateSlot from "./pages/CreateSlot.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Layout from './components/Layout.jsx';
import Certificate from "./pages/Certificate.jsx";
import Business from "./pages/Business.jsx";
import Psychologists from "./pages/Psychologists.jsx";
import ChoosePsychologist from "./pages/ChoosePsychologist.jsx";
import Requests from "./pages/Requests.jsx";
import FAQ from "./pages/FAQ.jsx";
import PsychologistInfoPage from "./pages/PsychologistInfoPage.jsx";

function App() {
    const {user, isPsychologist, isAdmin} = useAuth();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch(`${config.backendUrl}/user/${user.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();
                    setUserDetails(data.user);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserDetails();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Router>
            <Layout>
                <div className=" mx-auto ">
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/admin" element={user && isAdmin ? <AdminPage/> : <Navigate to="/"/>}/>
                        <Route path="/profile"
                               element={user && !isPsychologist ? <ProfilePage userDetails={userDetails}/> :
                                   <Navigate to="/login"/>}/>
                        <Route path="/psychologist-profile/:id"
                               element={isPsychologist ? <PsychologistProfilePage/> : <Navigate to="/"/>}/>
                        <Route path="/update-user/:id" element={user ? <UpdateUserDetails/> : <Navigate to="/"/>}/>
                        <Route path="/update-psychologist/:id"
                               element={isPsychologist ? <UpdatePsychologistDetails/> : <Navigate to="/"/>}/>
                        <Route path="/create-slot" element={isPsychologist ? <CreateSlot/> : <Navigate to="/"/>}/>
                        <Route path="/gift-certificate" element={<Certificate/>}/>
                        <Route path="/for-business" element={<Business/>}/>
                        <Route path="/for-psychologists" element={<Psychologists/>}/>
                        <Route path="/select-psychologist" element={<ChoosePsychologist/>}/>
                        <Route path="/requests" element={<Requests/>}/>
                        <Route path="/FAQ" element={<FAQ/>}/>
                        <Route path="/psychologist-info/:id" element={<PsychologistInfoPage />} />
                    </Routes>
                </div>
            </Layout>
        </Router>
    );
}

export default App;
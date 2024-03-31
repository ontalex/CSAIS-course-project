import { Route, Routes } from 'react-router-dom'

import Error from './pages/Error'

import { Login } from './pages/Login'
import Home from './pages/Admin/Home'
import Index from './pages/Index'
import Admin from './pages/Admin'

import Logbook from './pages/Admin/Logbook'
import Schedule from './pages/Admin/Schedule'
import Data from './pages/Admin/Data'
import Order from './pages/Admin/Order'
import Profile from './pages/Admin/Profile'
import { AuthProvider } from './hok/AuthProvider'
import { RequireAuth } from './hok/RequireAuth'
import Lessons from './pages/Admin/Data/Lessons'
import Groups from './pages/Admin/Data/Groups'
import Students from './pages/Admin/Data/Students'
import Teachers from './pages/Admin/Data/Teachers'

export default function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Index />}>
                        <Route path="*" element={<Error />} />
                        <Route
                            path="login"
                            element={<Login />}
                            errorElement={<Error />}
                        />
                        <Route
                            path="admin"
                            element={
                                <RequireAuth>
                                    <Admin />
                                </RequireAuth>
                            }
                            errorElement={<Error />}
                        >
                            <Route path="*" element={<Error />} />
                            <Route index element={<Home />} />
                            <Route path="logbook" element={<Logbook />} />
                            <Route path="schedule" element={<Schedule />} />
                            <Route path="data" element={<Data />}>
                                <Route path="*" element={<Error />} />
                                <Route path="lessons" element={<Lessons />} />
                                <Route path="groups" element={<Groups />} />
                                <Route path="teachers" element={<Teachers />} />
                                <Route path="students" element={<Students />} />
                            </Route>
                            <Route path="order" element={<Order />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    )
}

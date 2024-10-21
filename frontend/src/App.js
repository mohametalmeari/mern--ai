import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  CodeGeneration,
  Conversation,
  Dashboard,
  Home,
  ImageGeneration,
  Layout,
  MusicGeneration,
  NotFound,
  Settings,
  VideoGeneration,
} from "./pages";
import {
  ResetPassword,
  SignIn,
  SignUp,
  Verify,
  ForgotPassword,
  Layout as AuthLayout,
} from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={Home} />
        <Route path="/dashboard" Component={Layout}>
          <Route index Component={Dashboard} />
          <Route path="conversation" Component={Conversation} />
          <Route path="conversation/:id" Component={Conversation} />
          <Route path="image-generation" Component={ImageGeneration} />
          <Route path="video-generation" Component={VideoGeneration} />
          <Route path="music-generation" Component={MusicGeneration} />
          <Route path="code-generation" Component={CodeGeneration} />
          <Route path="code-generation/:id" Component={CodeGeneration} />
          <Route path="settings" Component={Settings} />
        </Route>

        <Route path="/" Component={AuthLayout}>
          <Route path="sign-up" Component={SignUp} />
          <Route path="sign-in" Component={SignIn} />
          <Route path="verify/:token" Component={Verify} />
          <Route path="reset-password/:token" Component={ResetPassword} />
          <Route path="forgot-password" Component={ForgotPassword} />
        </Route>
      </Route>
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default App;

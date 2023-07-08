import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './views/Layout';
import Auth from './views/Auth';
import Topic from './components/Topic';
import Room from './components/Room';
import Meeting from './views/Meeting';
import ListPost from './components/ListPost';
import ListPostByTopic from './components/ListPostByTopic';
import ProtectedRoute from './components/ProtectedRoute';
import Post from './components/Post';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import AuthContextProvider  from './contexts/AuthContext'
import TopicContextProvider  from './contexts/TopicContext'
import PostContextProvider  from './contexts/PostContext'
import CommentContextProvider  from './contexts/CommentContext'
import ReplyContextProvider  from './contexts/ReplyContext'
import LikeContextProvider  from './contexts/LikeContext'
import RoomContextProvider  from './contexts/RoomContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <TopicContextProvider>
  <PostContextProvider>
  <LikeContextProvider>
  <CommentContextProvider>
  <ReplyContextProvider>
  <RoomContextProvider>

    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Topic />}></Route>
            <Route path="topics" element={<Topic />}></Route>
            <Route path="topic/:topicId" element={<ListPostByTopic />}></Route>
            <Route path="all-posts" element={<ListPost />}></Route>
            <Route path="myposts" element={<ProtectedRoute />}></Route>
            <Route path="post/:postId" element={<Post />}></Route>
          </Route>
          
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/meeting" element={<Meeting />}></Route>
          <Route path="/meeting/room/:id" element={<Room />}></Route>
        </Routes>
      </BrowserRouter> 
    </React.StrictMode>

    </RoomContextProvider>
    </ReplyContextProvider>
    </CommentContextProvider>
    </LikeContextProvider>
    </PostContextProvider>
    </TopicContextProvider>
    </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

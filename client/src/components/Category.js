import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Category = () => {

    const PageDirect = (event) => {
        return window.location.href = event.target.value
    }

    return (
        <div className='container'>
            <div className='category'>
                <ul className='category-menu'>
                    <a href="/topics"><li className='category-menu-item' id='Topics'>Topics</li></a>
                    <a href="/all-posts"><li className='category-menu-item' id='AllPosts'>All Posts</li></a>
                    <a href="/myposts"><li className='category-menu-item' id='MyPosts'>My Posts</li></a>
                </ul>
                <select id='category-menu-mobile' onChange={PageDirect}>
                    <option value="/topics">Topics</option>
                    <option value="/all-posts">All Posts</option>
                    <option value="/myposts">My Posts</option>
                </select>
                <div className='search'>
                    <input
                        type='search'
                        name='search'
                        placeholder='Search'
                        className='inp-search'
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className='icon-search' />
                </div>
                <div className='search-mobile'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                </div>
            </div>
        </div>
    );
};

export default Category;
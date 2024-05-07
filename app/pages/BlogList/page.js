
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = async () => {
        try {
            const response = await fetch(`http://localhost:6600/read`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteBlog = async (id) => {
        try {
            const response = await fetch(`http://localhost:6600/delete/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }
            getBlog();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let handleSearch = async (e) => {
        
        try {
            let val = e.target.value;
            let url = val ? `http://localhost:6600/search/${val}` : "http://localhost:6600/read";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to search blogs');
            }
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Blog List</h1>
            <div className="flex justify-end mb-4">
                <Link
                    href="/"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                    Add New Blog
                </Link>
            </div>
            <input
                type="text"
                placeholder="Type to search"
                className="search-bar border border-gray-300 dark:border-gray-700 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500 text-gray-900 dark:text-gray"
                onChange={handleSearch}
            />
            <div className="flex flex-col items-center">
            {!blogs && <div className='text-center' >No Data Found</div>}

                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="blog-card bg-white dark:bg-gray-800 shadow-md rounded-md p-4 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                                <div className="flex items-center">
                                    <Link
                                        href={{
                                            pathname: `/`,
                                            query: { blogid: blog._id }
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mr-2"
                                    >
                                        Update

                                    </Link>
                                    <button
                                        onClick={() => handleDeleteBlog(blog._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{blog.title.toUpperCase()}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {/* {blog.description} */}
                            {blog.description.length > 20 ? blog.description.substring(0, 70) + '...' : blog.description}
                            </p>
                            <Link
                                href={{
                                    pathname: `/pages/BlogList/${blog._id}`,
                                    query: { blogid: blog._id }
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Read More
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No blogs found.</p>
                )}
            </div>
        </div>
    );
}

export default BlogList;

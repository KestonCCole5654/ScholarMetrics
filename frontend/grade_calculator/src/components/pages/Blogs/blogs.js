import React, { useState } from 'react';
import { ChevronRight, Search, Calendar, User, Tag } from 'lucide-react';

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const blogPosts = [
        {
            id: 1,
            title: 'Mastering Your GPA: Strategies for Academic Success',
            excerpt: 'Discover proven techniques to improve your academic performance and maintain a high GPA throughout your college journey.',
            author: 'Emily Johnson',
            date: 'June 15, 2024',
            tags: ['Academic Success', 'Study Tips', 'GPA'],
            imageUrl: '/images/study-success.jpg'
        },
        {
            id: 2,
            title: 'Understanding Grade Calculations: A Comprehensive Guide',
            excerpt: 'Learn how different grading systems work and how to accurately calculate your grades across various academic settings.',
            author: 'Michael Chen',
            date: 'May 22, 2024',
            tags: ['Grade Calculation', 'Education', 'Academic Planning'],
            imageUrl: '/images/grade-calculation.jpg'
        },
        {
            id: 3,
            title: 'Balancing Academics and Personal Life in College',
            excerpt: 'Practical tips for managing your time, reducing stress, and maintaining a healthy balance between studies and personal life.',
            author: 'Sarah Rodriguez',
            date: 'April 10, 2024',
            tags: ['Student Life', 'Time Management', 'Wellness'],
            imageUrl: '/images/student-balance.jpg'
        }
    ];

    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 bg-blue-50">
            {/* Header Section */}
            <div className="bg-blue-100 p-8 rounded-lg mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Student Success Blogs
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover insights, tips, and strategies to excel in your academic journey. 
                    From grade calculation to study techniques, we've got you covered.
                </p>

                {/* Search Bar */}
                <div className="mt-6 max-w-md mx-auto">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-row-3 gap-6">
                {filteredPosts.map(post => (
                    <div 
                        key={post.id} 
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl"
                    >
                        {/* Post Image */}
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Post Content */}
                        <div className="p-6">
                            <div className="flex items-left text-left text-sm text-gray-500 mb-2">
                                <User className="w-4 h-4 mr-2" />
                                {post.author}
                                <span className="mx-2">•</span>
                                <Calendar className="w-4 h-4 mr-2" />
                                {post.date}
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                {post.title}
                            </h2>

                            <p className="text-gray-600 mb-4">
                                {post.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex items-center flex-wrap gap-2 mb-4">
                                <Tag className="w-4 h-4 text-gray-500" />
                                {post.tags.map(tag => (
                                    <span 
                                        key={tag} 
                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Read More Button */}
                            <button className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                                Read More
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                    <h2 className="text-2xl text-gray-600">
                        No blog posts found
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Try a different search term or check back later for new content.
                    </p>
                </div>
            )}
        </div>
    );
};

export default BlogPage;
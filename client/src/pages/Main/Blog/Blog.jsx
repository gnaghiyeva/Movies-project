import React from 'react'
import BlogHero from './BlogHero/BlogHero'
import MainBlogs from './MainBlogs/MainBlogs'
import { Helmet } from 'react-helmet'

const Blog = () => {
  return (
    <>

      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <BlogHero />
      <MainBlogs />
    </>
  )
}

export default Blog
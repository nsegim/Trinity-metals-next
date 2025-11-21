"use client"

import { usePost } from '@/hooks/usePosts'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import SideBar from '../layout/SideBar/SideBar'
import SocialShare from '../common/SocialShare/SocialShare'
import ImageGallery from '../common/ImageGallery'
import moment from 'moment'
import "./styles.css";
import { getFeaturedImage } from '@/lib/extract'

interface ArticleProps {
    slug: string
}


function ArticleDatails({ slug }: ArticleProps) {
    const { data, isLoading } = usePost(slug)
    // let currentCategories: { [key: number]: string } = {};

    let featuredImage

    if (isLoading || data === null)
        return <Spinner />
    if (data)
        featuredImage = getFeaturedImage(data)

    const heroStyle = {
        backgroundImage: featuredImage ? `url(${featuredImage})` : "linear-gradient(135deg, #1a1a1a, #333)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
    return (
        <>
            {/* Hero */}
            <div className="custom-hero single-post" style={heroStyle}>
                <div className="child-item-wrapper z-1">
                    <h1 className="heading" dangerouslySetInnerHTML={{ __html: data?.title.rendered || '' }} />
                    <div className="published-date">
                        <h4>{moment(data?.date).format("DD MMMM, YYYY")}</h4>
                    </div>
                </div>
            </div>

            <div className="single-post-wrapper">
                <div className="container">
                    <div className="row">
                        {/* Main Content */}
                        <div className="col-md-8">
                            <div className="post-details">
                                <div className="post-content">
                                    {/* Meta */}
                                    <div className="post-meta-wrapper">
                                        <ul className="post-meta">
                                            <li>
                                                <a href="#">
                                                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Icon.svg" customClass="Admin-icon" imageName="Author" width={15} height={16} alt={undefined} />
                                                    <p>Admin</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Document-icon.svg" customClass="Category-icon" imageName="Category" width={15} height={16} alt={undefined} />
                                                    <p>Industrial</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Content */}
                                    <div className="the_content" dangerouslySetInnerHTML={{ __html: data?.content.rendered || '' }} />

                                    {/* Share */}
                                    <div className="share-the-post">
                                        <SocialShare postUrl={data?.link || ''} postTitle={data?.title.rendered || ''} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-md-4">
                            <SideBar
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ArticleDatails
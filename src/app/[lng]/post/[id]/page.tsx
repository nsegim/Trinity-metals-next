import ArticleDatails from '@/components/posts/ArticleDatails'
import React from 'react'
interface ArticleProps{
  params:Promise<{id:string}>
}
export default async function SingleArticle({params}:ArticleProps) {
  const {id} = await params
  return (
    <ArticleDatails slug={id}/>
  )
}

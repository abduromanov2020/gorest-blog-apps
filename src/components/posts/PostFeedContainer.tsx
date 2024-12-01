import { BlogPost } from '@/types/post'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Empty, Input, Pagination, Space, Spin, message } from 'antd'
import Cookies from 'js-cookie'
import { ChangeEvent } from 'react'
import PostCard from './PostPreviewCard'

interface PostsFeedContainerProps {
  posts: BlogPost[] | undefined
  total: number
  isLoading: boolean
  isFetching: boolean
  isPending: boolean
  currentPage: number
  searchValue: string
  onPageChange: (page: number) => void
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onCreatePost: () => void
  onReset: () => void
}

export default function PostsFeedContainer({
  posts,
  total,
  isLoading,
  isFetching,
  isPending,
  currentPage,
  searchValue,
  onPageChange,
  onSearchChange,
  onCreatePost,
  onReset,
}: PostsFeedContainerProps) {
  const handleCreateClick = () => {
    if (!Cookies.get('gorest_token')) {
      message.error('Please sign in to create a post')
      return
    }
    onCreatePost()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative max-w-md w-full">
          <Input
            placeholder="Search posts..."
            allowClear
            value={searchValue}
            onChange={onSearchChange}
            className={isPending ? 'bg-gray-50' : ''}
          />
          {(isPending || isFetching) && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <Spin size="small" />
            </div>
          )}
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateClick}
          className="dark:bg-blue-700 dark:text-gray-300"
        >
          Create Post
        </Button>
      </div>

      <div className={isFetching ? 'opacity-60 pointer-events-none' : ''}>
        {posts?.length ? (
          <>
            <Space direction="vertical" className="w-full" size="middle">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Space>

            {total > 10 && (
              <div className="flex justify-center pt-6">
                <Pagination
                  current={currentPage}
                  onChange={onPageChange}
                  total={total}
                  pageSize={10}
                  showSizeChanger={false}
                  disabled={isFetching}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <Empty
              description={
                <Space direction="vertical" size="small">
                  <span className="dark:text-white">No posts found</span>
                  {searchValue && (
                    <Button
                      type="primary"
                      icon={<ReloadOutlined />}
                      onClick={onReset}
                    >
                      Reset Search
                    </Button>
                  )}
                </Space>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

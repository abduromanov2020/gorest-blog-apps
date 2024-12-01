import { BlogPostService } from '@/services/blogPostService'
import { BlogPost } from '@/types/post'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Popconfirm, Space, message } from 'antd'
import Cookies from 'js-cookie'
import { useState } from 'react'
import PostModal from './PostEditorModal'

export default function PostPreviewCard({ post }: { post: BlogPost }) {
  const queryClient = useQueryClient()
  const [modalMode, setModalMode] = useState<'view' | 'edit' | null>(null)

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: BlogPostService.deletePostById,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const previousPosts = queryClient.getQueryData<BlogPost[]>(['posts'])
      queryClient.setQueryData<BlogPost[]>(
        ['posts'],
        (old) => old?.filter((p) => p.id !== postId) || []
      )
      return { previousPosts }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts)
      message.error(err.message)
    },
    onSuccess: () => {
      message.success('Post deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleDelete = () => {
    if (!Cookies.get('gorest_token')) {
      message.error('Please sign in to delete posts')
      return
    }
    deletePost(post.id)
  }

  const handleEdit = () => {
    if (!Cookies.get('gorest_token')) {
      message.error('Please sign in to edit posts')
      return
    }
    setModalMode('edit')
  }

  return (
    <>
      <Card
        data-testid="post-card"
        title={post.title}
        className="w-full hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
        styles={{
          header: {
            color: 'inherit',
          },
        }}
      >
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.body}
        </p>

        <Space className="mt-4">
          <Button
            icon={<EyeOutlined />}
            onClick={() => setModalMode('view')}
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={handleEdit}
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Post"
            description="Are you sure you want to delete this post?"
            onConfirm={handleDelete}
            okButtonProps={{ loading: isDeleting }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              className="dark:bg-red-900 dark:border-red-800 dark:hover:bg-red-800"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </Card>
      <PostModal
        post={post}
        isOpen={modalMode !== null}
        mode={modalMode || 'view'}
        onClose={() => setModalMode(null)}
      />
    </>
  )
}

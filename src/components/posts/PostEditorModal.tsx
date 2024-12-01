import { BlogPostService } from '@/services/blogPostService'
import { BlogPost, BlogPostForm } from '@/types/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, message, Modal } from 'antd'
import { useEffect } from 'react'
import PostDetailView from './PostContentView'

interface PostEditorModalProps {
  post?: BlogPost
  isOpen: boolean
  mode: 'view' | 'edit' | 'create'
  onClose: () => void
}

export default function PostEditorModal({
  post,
  isOpen,
  mode,
  onClose,
}: PostEditorModalProps) {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isOpen && post && mode === 'edit') {
      form.setFieldsValue({
        title: post.title,
        body: post.body,
      })
    } else if (isOpen && mode === 'create') {
      form.resetFields()
    }

    if (!isOpen) {
      form.resetFields()
    }
  }, [isOpen, post, mode, form])

  const handleError = (error: any) => {
    if (error.response?.data) {
      const errors = error.response.data
      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          message.error(`${err.field}: ${err.message}`)
        })
      } else {
        message.error('An error occurred while saving the post')
      }
    } else {
      message.error('An error occurred while saving the post')
    }
  }

  const createMutation = useMutation({
    mutationFn: (data: BlogPostForm) => BlogPostService.createNewPost(data),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const previousPosts = queryClient.getQueryData<BlogPost[]>(['posts'])

      queryClient.invalidateQueries({ queryKey: ['posts'] })

      return { previousPosts }
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts)
      handleError(err)
    },
    onSuccess: () => {
      message.success('Post created successfully')
      onClose()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: BlogPostForm) => {
      if (!post?.id) throw new Error('No post id')
      return BlogPostService.updateExistingPost(post.id, data)
    },
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const previousPosts = queryClient.getQueryData<BlogPost[]>(['posts'])

      queryClient.invalidateQueries({ queryKey: ['posts'] })

      return { previousPosts }
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts)
      handleError(err)
    },
    onSuccess: () => {
      message.success('Post updated successfully')
      onClose()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSubmit = async (values: BlogPostForm) => {
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(values)
      } else if (mode === 'edit' && post) {
        await updateMutation.mutateAsync(values)
      }
    } catch (error) {}
  }

  const isLoading = createMutation.isPending || updateMutation.isPending
  const isViewing = mode === 'view'
  const isCreating = mode === 'create'

  return (
    <Modal
      title={
        isViewing ? 'Post Details' : isCreating ? 'Create Post' : 'Edit Post'
      }
      open={isOpen}
      onCancel={onClose}
      footer={
        isViewing
          ? [
              <Button key="close" onClick={onClose}>
                Close
              </Button>,
            ]
          : [
              <Button key="cancel" onClick={onClose}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={form.submit}
                loading={isLoading}
              >
                {isCreating ? 'Create' : 'Save'}
              </Button>,
            ]
      }
      width={800}
      maskClosable={false}
      destroyOnClose={false}
    >
      {isViewing && post ? (
        <PostDetailView post={post} />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={post}
          disabled={isViewing}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="body"
            label="Content"
            rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

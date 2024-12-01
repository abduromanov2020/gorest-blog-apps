import { BlogPost } from '@/types/post'
import { Divider, Typography } from 'antd'
import { UserCircle } from 'lucide-react'

const { Title, Paragraph, Text } = Typography

export default function PostContentView({ post }: { post: BlogPost }) {
  return (
    <div className="space-y-6">
      <div>
        <Title level={3} className="!mb-2">
          {post.title}
        </Title>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <UserCircle className="w-5 h-5" />
          <Text type="secondary">User ID: {post.user_id}</Text>
        </div>
      </div>

      <Divider className="!my-4" />

      <div className="bg-gray-50 rounded-lg p-6">
        <Paragraph className="text-lg whitespace-pre-wrap">
          {post.body}
        </Paragraph>
      </div>

      <div className="pt-4">
        <Text type="secondary" className="text-sm">
          Post ID: #{post.id}
        </Text>
      </div>
    </div>
  )
}

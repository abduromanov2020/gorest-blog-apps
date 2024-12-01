import { BlogPost, BlogPostForm } from '@/types/post'
import Cookies from 'js-cookie'
import axiosInstance from '../config/axios'

export interface PaginatedPostsResponse {
  data: BlogPost[]
  total: number
}

export interface PostsQueryParams {
  page?: number
  perPage?: number
  title?: string
}

export class BlogPostService {
  private static getUserId(): number {
    const userId = Cookies.get('user_id')
    if (!userId) throw new Error('Authentication required')
    return parseInt(userId)
  }

  static async fetchPaginatedPosts({
    page = 1,
    perPage = Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE),
    title = '',
  }: PostsQueryParams = {}): Promise<PaginatedPostsResponse> {
    const { data, headers } = await axiosInstance.get<BlogPost[]>('/posts', {
      params: {
        page,
        per_page: perPage,
        title: title || undefined,
      },
    })

    return {
      data,
      total: parseInt(headers['x-pagination-total'] || '0'),
    }
  }

  static async fetchPostById(postId: number): Promise<BlogPost> {
    const { data } = await axiosInstance.get<BlogPost>(`/posts/${postId}`)
    return data
  }

  static async createNewPost(postData: BlogPostForm): Promise<BlogPost> {
    const userId = this.getUserId()

    const { data } = await axiosInstance.post<BlogPost>('/posts', {
      ...postData,
      user_id: userId,
    })
    return data
  }

  static async updateExistingPost(
    postId: number,
    postData: Partial<BlogPostForm>
  ): Promise<BlogPost> {
    const userId = this.getUserId()

    const { data } = await axiosInstance.put<BlogPost>(`/posts/${postId}`, {
      ...postData,
      user_id: userId,
    })
    return data
  }

  static async deletePostById(postId: number): Promise<void> {
    await axiosInstance.delete(`/posts/${postId}`)
  }
}

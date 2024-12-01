export interface BlogPost {
  id: number
  user_id: number
  title: string
  body: string
}

export interface BlogPostForm {
  id: number
  user_id: number
  title: string
  body: string
}

export interface BlogPostresponse {
  data: BlogPost[]
  meta: {
    pagination: {
      total: number
      pages: number
      page: number
      limit: number
    }
  }
}

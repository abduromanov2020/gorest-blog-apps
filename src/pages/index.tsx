import UserRegistrationModal from '@/components/common/UserRegistrationModal'
import AppLayout from '@/components/layouts/AppLayout'
import PostEditorModal from '@/components/posts/PostEditorModal'
import PostsFeedContainer from '@/components/posts/PostFeedContainer'
import { useRegistrationState } from '@/hooks/useRegistrationState'
import { BlogPostService } from '@/services/blogPostService'
import { BlogPost } from '@/types/post'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useState, useTransition } from 'react'

interface HomePageProps {
  initialPosts: BlogPost[]
  totalPosts: number
}

export default function HomePage({ initialPosts, totalPosts }: HomePageProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const { showModal, closeModal } = useRegistrationState()

  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['posts', page, search],
    queryFn: () => BlogPostService.fetchPaginatedPosts({ page, title: search }),
    initialData:
      page === 1 && !search
        ? { data: initialPosts, total: totalPosts }
        : undefined,
    placeholderData: keepPreviousData,
  })

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    startTransition(() => {
      setPage(1)
      router.push({
        pathname: router.pathname,
        query: { ...(value ? { search: value } : {}) },
      })
    })
  }

  return (
    <AppLayout>
      <UserRegistrationModal isOpen={showModal} onClose={closeModal} />
      <PostEditorModal
        mode="create"
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <PostsFeedContainer
        posts={postsData?.data}
        total={postsData?.total || 0}
        isLoading={isLoading}
        isFetching={isFetching}
        isPending={isPending}
        currentPage={page}
        searchValue={search}
        onPageChange={setPage}
        onSearchChange={handleSearchChange}
        onCreatePost={() => setCreateModalOpen(true)}
        onReset={() => {
          setSearch('')
          setPage(1)
        }}
      />
    </AppLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data, total } = await BlogPostService.fetchPaginatedPosts({
      page: 1,
    })

    return {
      props: {
        initialPosts: data,
        totalPosts: total,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

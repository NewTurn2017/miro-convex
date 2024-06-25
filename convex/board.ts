import { ConvexError, v } from 'convex/values'
import { mutation, MutationCtx, QueryCtx } from './_generated/server'

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg',
]

async function assertAuthorized(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new ConvexError('Unauthorized')
  }
  return identity
}

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await assertAuthorized(ctx)

    const randomImage = images[Math.floor(Math.random() * images.length)]

    const boards = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    })

    return boards
  },
})

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    await assertAuthorized(ctx)

    // TODO: 삭제 시 favorite 관계 체크
    await ctx.db.delete(args.id)
  },
})

export const update = mutation({
  args: {
    id: v.id('boards'),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await assertAuthorized(ctx)

    const title = args.title.trim()

    if (!title) {
      throw new ConvexError('Title is required')
    }

    if (title.length > 60) {
      throw new ConvexError('Title must be less than 60 characters')
    }

    const board = await ctx.db.patch(args.id, { title })
    return board
  },
})

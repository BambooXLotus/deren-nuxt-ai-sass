import OpenAI from 'openai'

const config = useRuntimeConfig()
const openai = new OpenAI({
  apiKey: config.openaiKey,
})

export default defineEventHandler(async (event) => {
  // await protectedRoute(event)

  const { messages } = await readBody(event)

  if (!openai.apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API Key not configured.',
    })
  }

  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Messages are required',
    })
  }

  // const freeTrial = await checkApiLimit(user.id)
  // const isPro = await checkSubscription(user.id)

  // if (!freeTrial && !isPro) {
  //   throw createError({
  //     statusCode: 403,
  //     statusMessage: 'Free trial has expired. Please upgrade to pro.',
  //   })
  // }

  // const response = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages,
  // })

  // await incrementApiLimit(user.id)

  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  })
})

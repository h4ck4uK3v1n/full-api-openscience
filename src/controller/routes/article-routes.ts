import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ArticlesWrapper } from '../../data/interfaces/articles-wrapper'

const ArticlesRouter = (database: ArticlesWrapper) => {
    const articleRouter = Router()

    articleRouter.post('/articles', async (req, res) => {
        try {
            const article = req.body

            const createdArticle = await database.create(article)

            if (!createdArticle) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Article not created' })
            }
            return res.status(StatusCodes.CREATED).json({ createdArticle })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
        }
    })
    return articleRouter
}


export default ArticlesRouter
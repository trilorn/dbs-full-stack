import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { Request, Response } from 'express-serve-static-core'
import processAndSaveImage from './utils/processAndSaveImage'

async function imageUpload(req: Request, res: Response) {
  try {
    if (isEmpty(req.files)) {
      return res.status(400).send('No files were uploaded.')
    }

    // Save processed image variants
    const promises = map(req.files, processAndSaveImage)

    const imagesData = await Promise.all(promises)

    res.send({ images: imagesData })
  } catch (error) {
    throw new Error('Image uploading failure')
  }
}

export default imageUpload

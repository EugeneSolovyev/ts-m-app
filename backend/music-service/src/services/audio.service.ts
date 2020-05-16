import { Request, Response } from 'express'
import { MongooseDocument } from 'mongoose'
import { head } from 'ramda'
import util from 'util'
import { AudioModel } from '../models/audio.model'
import { GridFS } from '../DB/grd-filesystem'
import { ALLOWED_AUDIO_TYPES } from '../constants/allowed_audio_types'

export interface MulterFile {
  key: string // Available using `S3`.
  path: string // Available using `DiskStorage`.
  mimetype: string
  originalname: string
  size: number
  [key: string]: any
}

export interface IFiles {
  files: MulterFile[]
}

export class AudioService {
  public gridFS: GridFS

  constructor() {
    this.gridFS = new GridFS()

    this.upload_audio = this.upload_audio.bind(this)
    this.get_all_audio = this.get_all_audio.bind(this)
    this.get_audio_by_generic_id = this.get_audio_by_generic_id.bind(this)
    this.get_types = this.get_types.bind(this)
  }

  public get_all_audio(req: Request, res: Response) {
    AudioModel.find({}, (error: Error, audio: MongooseDocument) => {
      if (error) {
        res.send(error)
      }
      res.json(audio)
    })
  }

  public async upload_audio(req: Request & IFiles, res: Response) {
    try {
      const upload = util.promisify(this.gridFS.storage)
      await upload(req, res)

      const { track, cover } = req.files as any

      const audio = new AudioModel({
        ...req.body,
        track_id: (head(track) as any).filename,
        cover_id: (head(cover) as any).filename,
      })
      const audio_document = await audio.save()
      res.status(200).json(audio_document)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  public get_audio_by_generic_id(req: Request, res: Response) {
    this.gridFS.grid_fs_stream.collection(GridFS.collection_name)

    this.gridFS.grid_fs_stream.files
      .find({ filename: req.params.filename })
      .toArray(this.create_stream(res))
  }

  private create_stream = (res) => (err, files: any) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: 'error',
      })
    }
    const readstream = this.gridFS.grid_fs_stream.createReadStream({
      filename: (head(files) as any).filename,
      root: GridFS.collection_name,
    })
    res.set('Content-Type', (head(files) as any).contentType)
    return readstream.pipe(res)
  }

  public async set_like_to_audio_by_id(req: Request, res: Response) {
    try {
      const { track_id } = req.body
      const audio = await AudioModel.findOneAndUpdate(
        { track_id },
        {
          $inc: {
            likes: 1,
          },
          updatedAt: Date.now(),
        },
        { new: true }
      )
      res.status(200).json(audio)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  public get_types(req: Request, res: Response) {
    res.status(200).json(ALLOWED_AUDIO_TYPES)
  }
}

import mongoose from 'mongoose'
import multer, { Multer } from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'

export class GridFS {
  static collection_name: string = 'contentFiles'

  public storage: Multer
  public grid_fs_stream: Grid

  constructor() {
    this.grid_fs_stream = this.get_grid_fs_stream()
    this.storage = this.get_storage(this.grid_fs_stream)
  }

  private get_grid_fs_stream(): Grid {
    Grid.mongo = mongoose.mongo
    return Grid(mongoose.connection.db)
  }

  private get_storage = (grid_fs_stream): Multer =>
    multer({
      storage: GridFsStorage({
        gfs: grid_fs_stream,
        filename: this.get_filename,
        root: GridFS.collection_name,
      }),
    }).fields([
      { name: 'track', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ])

  private get_filename(req, { originalname }, cb): any {
    const track_id = new (Buffer.from as any)(originalname).toString('base64')
    cb(null, track_id)
  }
}

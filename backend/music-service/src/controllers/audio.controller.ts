import { Application } from 'express'
import { AudioService } from '../services/audio.service'

export class AudioController {
  private audioService: AudioService

  constructor(private app: Application) {
    this.audioService = new AudioService()
    this.routes()
  }

  public routes() {
    this.app.route('/music-service/file').get(this.audioService.get_all_audio)
    this.app
      .route('/music-service/file/:filename')
      .get(this.audioService.get_audio_by_generic_id)
    this.app
      .route('/music-service/file')
      .post(this.audioService.upload_audio)
    this.app
      .route('/music-service/file')
      .put(this.audioService.set_like_to_audio_by_id)
  }
}

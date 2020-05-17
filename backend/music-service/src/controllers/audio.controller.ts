import { Application } from "express";
import { AudioService } from "../services/audio.service";

export class AudioController {
  private audioService: AudioService;

  constructor(private app: Application) {
    this.audioService = new AudioService();
    this.routes();
  }

  public routes() {
    /**
    * @swagger
    *
    * /music-service/file:
    *   get:
    *     summary: Returns a colleaction of uploaded files
    *     tags:
    *       - Files
    *     responses:
    *       200:
    *         description: Collection of uploaded files
    */
    this.app.route("/music-service/file").get(this.audioService.get_all_audio);
    /**
    * @swagger
    *
    * /music-service/favorites:
    *   get:
    *     summary: Returns a colleaction of uploaded files by passed ids
    *     description: Make sure that you've encoded all query params
    *     tags:
    *       - Files
    *     parameters:
    *       - in: query
    *         name: track_ids[]
    *         explode: true
    *         required: true
    *         schema:
    *           type: array
    *           items:
    *             type: string
    *         description: array of track_id
    *     responses:
    *       200:
    *         description: Collection of uploaded files
    */
    this.app.route("/music-service/favorites").get(this.audioService.get_tracks_by_ids);
    /**
    * @swagger
    *
    * /music-service/{type}/file:
    *   get:
    *     summary: Returns a colleaction of uploaded files by passed type
    *     description: Make sure that you've encoded all query params
    *     tags:
    *       - Files
    *     parameters:
    *       - in: path
    *         name: type
    *         required: true
    *         schema:
    *           type: string
    *           enum: [music, book, podcast]
    *     responses:
    *       200:
    *         description: Collection of uploaded files
    */
    this.app.route("/music-service/:type/file").get(this.audioService.get_by_type);
    /**
    * @swagger
    *
    * /music-service/file/{filename}:
    *   get:
    *     summary: Returns stream of file
    *     tags:
    *       - Files
    *     parameters:
    *       - in: path
    *         name: filename
    *         required: true
    *         schema:
    *           type: string
    *         description: track_id or cover_id
    *     responses:
    *       200:
    *         description: Stream of the file
    */
    this.app
      .route("/music-service/file/:filename")
      .get(this.audioService.get_audio_by_generic_id);
    /**
    * @swagger
    *
    * /music-service/file:
    *   post:
    *     summary: Uploading of track
    *     tags:
    *       - Files
    *     requestBody:
    *       content:
    *         multipart/form-data:
    *           schema:
    *             type: object
    *             properties:
    *               author:
    *                 type: string
    *               title:
    *                 type: string
    *               album:
    *                 type: string
    *               type:
    *                 type: string
    *                 enum: [music, podcast, book]
    *               genres:
    *                 type: array
    *                 items:
    *                   type: string
    *               track:
    *                 type: string
    *                 format: binary
    *               cover:
    *                 type: string
    *                 format: binary
    *     responses:
    *       200:
    *         description: The document of uploaded file
    */
    this.app.route("/music-service/file").post(this.audioService.upload_audio);
    /**
    * @swagger
    *
    * /music-service/file:
    *   put:
    *     summary: Set like to track
    *     tags:
    *       - Files
    *     requestBody:
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               track_id:
    *                 type: string
    *     responses:
    *       200:
    *         description: Updated document
    */
    this.app
      .route("/music-service/file")
      .put(this.audioService.set_like_to_audio_by_id);
    /**
    * @swagger
    *
    * /music-service/get-allowed-types:
    *   get:
    *     summary: Returns allowed types
    *     tags:
    *       - Allowed types
    *     responses:
    *       200:
    *         description: Allowed types
    */
    this.app
      .route("/music-service/get-allowed-types")
      .get(this.audioService.get_types);
  }
}

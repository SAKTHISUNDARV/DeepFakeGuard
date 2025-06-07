// This file now uses plain JS and optional JSDoc for IntelliSense

/**
 * @typedef {Object} DetectedFace
 * @property {string} id
 * @property {{ x: number, y: number, width: number, height: number }} boundingBox
 * @property {number} confidence
 * @property {'authentic' | 'deepfake' | 'inconclusive'} status
 * @property {number} manipulationScore
 * @property {string[]=} artifacts
 */

/**
 * @typedef {Object} DetectionResult
 * @property {string} id
 * @property {string} timestamp
 * @property {'image' | 'video' | 'webcam'} sourceType
 * @property {string=} fileName
 * @property {string=} fileUrl
 * @property {'authentic' | 'deepfake' | 'inconclusive'} status
 * @property {number} confidence
 * @property {number} processingTime
 * @property {DetectedFace[]} detectedFaces
 */

/**
 * @typedef {Object} HistoryItem
 * @property {string} id
 * @property {string} timestamp
 * @property {'image' | 'video' | 'webcam'} sourceType
 * @property {string=} fileName
 * @property {string=} thumbnailUrl
 * @property {'authentic' | 'deepfake' | 'inconclusive'} status
 * @property {number} confidence
 */

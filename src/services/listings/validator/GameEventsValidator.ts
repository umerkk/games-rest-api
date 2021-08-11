import { triggerAsyncId } from 'async_hooks'
import { checkSchema } from 'express-validator'
import { isValidObjectId } from 'mongoose'

export const getAllValidator = checkSchema({
    limit: {
        in: ['query'],
        isInt: true,
        optional: true,
        errorMessage: 'Limit must be a number'
    },
    skip: {
        in: ['query'],
        isInt: true,
        optional: true,
        errorMessage: 'Skip must be a number'
    }
})

export const getByIdValidator = checkSchema({
    id: {
        in: ['params'],
        notEmpty: true,
        exists: true,
        custom: {
            options: (value) => isValidObjectId(value)
        },
        errorMessage: 'Id must be specified & valid'
    }
})


export const addGameEventValidator = checkSchema({
    category: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        errorMessage: 'Category must be specified & valid'
    },
    title: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        errorMessage: 'title must be specified & valid'
    },
    subtitle: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        errorMessage: 'subtitle must be specified & valid'
    },
    description: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        errorMessage: 'description must be specified & valid'
    },
    type: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        isInt: true,
        errorMessage: 'type must be specified & valid'
    },
    author: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        errorMessage: 'Author must be specified & valid'
    },
    replayBundleUrlJson: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        errorMessage: 'replayBundleUrlJson must be specified & valid'
    },
    duration: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        isInt: true,
        errorMessage: 'duration must be specified & valid'
    },
    isDownloadable: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        isBoolean: true,
        errorMessage: 'isDownloadable must be specified & valid'
    },
    isStreamable: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        isBoolean: true,
        errorMessage: 'isStreamable must be specified & valid'
    },
    version: {
        in: ['body'],
        notEmpty: true,
        exists: true,
        isInt: true,
        errorMessage: 'version must be specified & valid'
    }
})